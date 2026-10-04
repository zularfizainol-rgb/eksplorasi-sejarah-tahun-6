export type StationId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'final';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

export interface Station {
  id: StationId;
  title: string;
  iconName: string;
  questions: Question[];
  color: string;
  description: string;
}

export interface GameState {
  playerName: string;
  completedStations: StationId[];
  scores: Record<string, number>;
  totalScore: number;
  unlockedFinal: boolean;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}
