import { useState, useEffect } from 'react';
import { StationId, LeaderboardEntry, GameState } from '../types';

export function useGameStore() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('sejarahGame_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse game state");
      }
    }
    return {
      playerName: '',
      completedStations: [],
      scores: {},
      totalScore: 0,
      unlockedFinal: false,
    };
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    const saved = localStorage.getItem('sejarahGame_leaderboard');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse leaderboard");
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('sejarahGame_state', JSON.stringify(gameState));
    
    if (gameState.playerName) {
      try {
        const savedPlayers = localStorage.getItem('sejarahGame_players');
        const players = savedPlayers ? JSON.parse(savedPlayers) : {};
        players[gameState.playerName] = gameState;
        localStorage.setItem('sejarahGame_players', JSON.stringify(players));
      } catch (e) {
        console.error("Failed to save player state");
      }
    }
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem('sejarahGame_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  const login = (name: string) => {
    try {
      const savedPlayers = localStorage.getItem('sejarahGame_players');
      const players = savedPlayers ? JSON.parse(savedPlayers) : {};
      
      if (players[name]) {
        setGameState(players[name]);
      } else {
        setGameState({
          playerName: name,
          completedStations: [],
          scores: {},
          totalScore: 0,
          unlockedFinal: false,
        });
      }
    } catch (e) {
      console.error("Failed to load player state");
      setGameState({
        playerName: name,
        completedStations: [],
        scores: {},
        totalScore: 0,
        unlockedFinal: false,
      });
    }
  };

  const logout = () => {
    setGameState({
      playerName: '',
      completedStations: [],
      scores: {},
      totalScore: 0,
      unlockedFinal: false,
    });
  };

  const completeStation = (stationId: StationId, score: number) => {
    setGameState((prev) => {
      const prevScore = prev.scores[stationId] || 0;
      // Only keep the highest score for a station
      const newScore = Math.max(prevScore, score);
      
      const newScores = { ...prev.scores, [stationId]: newScore };
      
      const completedStations = prev.completedStations.includes(stationId) 
        ? prev.completedStations 
        : [...prev.completedStations, stationId];
        
      const totalScore = Object.values(newScores).reduce((a, b) => a + b, 0);
      
      // Unlock final challenge if total score is at least 150
      const unlockedFinal = totalScore >= 150;

      return {
        ...prev,
        scores: newScores,
        completedStations,
        totalScore,
        unlockedFinal
      };
    });
  };

  const submitFinalScore = (score: number) => {
    const finalTotal = gameState.totalScore + score;
    const newEntry: LeaderboardEntry = {
      name: gameState.playerName,
      score: finalTotal,
      date: new Date().toISOString()
    };
    
    setLeaderboard(prev => {
      const updated = [...prev, newEntry].sort((a, b) => b.score - a.score);
      return updated.slice(0, 10); // keep top 10
    });
  };

  return {
    gameState,
    leaderboard,
    login,
    logout,
    completeStation,
    submitFinalScore
  };
}
