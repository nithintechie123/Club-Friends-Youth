// Web Audio API Sound Synthesizer for Devotional Chimes & Bell Sounds

class DevotionalAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientOscillators = [];
    this.isAmbientPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Realistic Temple Brass Bell with multiple harmonic partials
  playTempleBell() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Fundamental frequencies and overtone harmonics of a bronze temple bell
    const frequencies = [440, 880, 1220, 1760, 2400, 3100];
    const gains = [0.6, 0.4, 0.25, 0.15, 0.08, 0.04];
    const decayTimes = [3.2, 2.5, 1.8, 1.2, 0.8, 0.5];

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Strike attack & slow metallic resonance decay
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gains[idx] * 0.4, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decayTimes[idx]);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + decayTimes[idx]);
    });
  }

  // Sacred Shankh (Conch Shell) Resonance Sound
  playShankh() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.8);
    filter.frequency.exponentialRampToValueAtTime(300, now + 2.5);

    // Frequency swell
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(293.66, now + 0.4); // D4
    osc.frequency.linearRampToValueAtTime(329.63, now + 1.2); // E4
    osc.frequency.exponentialRampToValueAtTime(220, now + 2.5);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.5);
    gain.gain.linearRampToValueAtTime(0.25, now + 1.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.6);
  }

  // Flower Shower Sparkle Chimes
  playFlowerChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      const startTime = now + i * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.6);
    });
  }

  // Coconut Break sound (Percussive crisp snap + hollow thud)
  playCoconutBreak() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);

    // High snap
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snapOsc.type = 'sawtooth';
    snapOsc.frequency.setValueAtTime(600, now);
    snapOsc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

    snapGain.gain.setValueAtTime(0.3, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    snapOsc.connect(snapGain);
    snapGain.connect(this.ctx.destination);

    snapOsc.start(now);
    snapOsc.stop(now + 0.06);
  }

  // Devotional Tanpura / Om Meditative Drone Toggle
  toggleDevotionalAmbient() {
    this.init();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  startAmbient() {
    if (this.isAmbientPlaying || !this.ctx) return;
    const now = this.ctx.currentTime;
    const freqs = [108, 162, 216, 324]; // Sacred Harmonic Ratios (A2 base tuning)
    
    this.ambientNodes = [];

    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now);

      // Subtle slow frequency modulation
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 0.2 + i * 0.1;
      lfoGain.gain.value = 1.5;
      lfo.connect(osc.frequency);
      lfo.start(now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04 / (i + 1), now + 2);

      if (panner) {
        panner.pan.value = (i % 2 === 0 ? -0.4 : 0.4);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.ctx.destination);
      } else {
        osc.connect(gain);
        gain.connect(this.ctx.destination);
      }

      osc.start(now);
      this.ambientNodes.push({ osc, gain, lfo });
    });

    this.isAmbientPlaying = true;
  }

  stopAmbient() {
    if (!this.isAmbientPlaying || !this.ambientNodes) return;
    const now = this.ctx ? this.ctx.currentTime : 0;
    this.ambientNodes.forEach(node => {
      try {
        node.gain.gain.linearRampToValueAtTime(0, now + 0.8);
        setTimeout(() => {
          node.osc.stop();
          node.lfo.stop();
        }, 900);
      } catch (e) {
        // ignore
      }
    });
    this.ambientNodes = [];
    this.isAmbientPlaying = false;
  }
}

export const devotionalAudio = new DevotionalAudio();
