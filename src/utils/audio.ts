export class TimerAudio {
  private ctx: AudioContext | null = null;
  private intervalId: number | null = null;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTick(isUrgent: boolean = false) {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    // Who Wants to Be a Millionaire style heartbeat/tick
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isUrgent ? 800 : 400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  startTicking() {
    this.init();
    if (this.intervalId) this.stopTicking();
    
    let ticks = 0;
    this.intervalId = window.setInterval(() => {
      ticks++;
      // make it sound more urgent every second
      this.playTick(ticks > 10);
    }, 1000);
  }

  stopTicking() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const timerAudio = new TimerAudio();
