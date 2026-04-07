/**
 * Audio engine using the Web Audio API to synthesize all UI sound effects.
 * No external audio files are needed -- every sound is generated programmatically.
 */
import type { SoundEffect } from "@/types/audio";

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// ─── Utility helpers ───────────────────────────────────────────────────────────

function createGain(ctx: AudioContext, volume: number): GainNode {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  return gain;
}

function playTone(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  type: OscillatorType,
  startTime: number,
  duration: number,
  volume: number,
  fadeOut = true,
) {
  const osc = ctx.createOscillator();
  const gain = createGain(ctx, volume);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  osc.connect(gain);
  gain.connect(dest);
  if (fadeOut) {
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  }
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playNoise(
  ctx: AudioContext,
  dest: AudioNode,
  startTime: number,
  duration: number,
  volume: number,
) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * volume;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = createGain(ctx, volume);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  source.connect(gain);
  gain.connect(dest);
  source.start(startTime);
  source.stop(startTime + duration);
}

// ─── Sound synthesizers ────────────────────────────────────────────────────────

type SoundFn = (ctx: AudioContext, dest: AudioNode) => void;

const sounds: Record<SoundEffect, SoundFn> = {
  // ── System ──────────────────────────────────────────────────────────────────
  startup(ctx, dest) {
    const t = ctx.currentTime;
    // Warm ascending chord: C5 → E5 → G5 with gentle attack
    playTone(ctx, dest, 523.25, "sine", t, 0.6, 0.25);
    playTone(ctx, dest, 659.25, "sine", t + 0.15, 0.5, 0.2);
    playTone(ctx, dest, 783.99, "sine", t + 0.3, 0.5, 0.18);
    // Soft shimmer overtone
    playTone(ctx, dest, 1046.5, "sine", t + 0.4, 0.4, 0.08);
  },

  shutdown(ctx, dest) {
    const t = ctx.currentTime;
    // Descending tone sweep
    const osc = ctx.createOscillator();
    const gain = createGain(ctx, 0.2);
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.5);
    osc.connect(gain);
    gain.connect(dest);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.start(t);
    osc.stop(t + 0.5);
  },

  restart(ctx, dest) {
    const t = ctx.currentTime;
    // Quick down-up sweep
    const osc = ctx.createOscillator();
    const gain = createGain(ctx, 0.18);
    osc.type = "sine";
    osc.frequency.setValueAtTime(500, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.2);
    osc.frequency.exponentialRampToValueAtTime(700, t + 0.5);
    osc.connect(gain);
    gain.connect(dest);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    osc.start(t);
    osc.stop(t + 0.55);
  },

  // ── Navigation ──────────────────────────────────────────────────────────────
  spotlightOpen(ctx, dest) {
    const t = ctx.currentTime;
    // Glass tap: quick high ping
    playTone(ctx, dest, 1200, "sine", t, 0.12, 0.12);
    playTone(ctx, dest, 1800, "sine", t + 0.02, 0.08, 0.06);
  },

  spotlightSelect(ctx, dest) {
    const t = ctx.currentTime;
    playTone(ctx, dest, 880, "sine", t, 0.08, 0.1);
  },

  dockLaunch(ctx, dest) {
    const t = ctx.currentTime;
    // Soft ascending pop
    playTone(ctx, dest, 400, "sine", t, 0.1, 0.12);
    playTone(ctx, dest, 700, "sine", t + 0.05, 0.12, 0.1);
  },

  contextMenu(ctx, dest) {
    const t = ctx.currentTime;
    // Quick crisp pop
    playTone(ctx, dest, 900, "triangle", t, 0.06, 0.1);
  },

  themeToggle(ctx, dest) {
    const t = ctx.currentTime;
    // Light switch feel: click + soft tone
    playTone(ctx, dest, 600, "square", t, 0.03, 0.08);
    playTone(ctx, dest, 800, "sine", t + 0.03, 0.1, 0.08);
  },

  languageToggle(ctx, dest) {
    const t = ctx.currentTime;
    playTone(ctx, dest, 700, "sine", t, 0.08, 0.1);
  },

  // ── Window management ───────────────────────────────────────────────────────
  windowOpen(ctx, dest) {
    const t = ctx.currentTime;
    // Gentle slide-in whoosh
    const osc = ctx.createOscillator();
    const gain = createGain(ctx, 0.0001);
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.15);
    osc.connect(gain);
    gain.connect(dest);
    gain.gain.exponentialRampToValueAtTime(0.1, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
    // Tiny pop at the end
    playTone(ctx, dest, 800, "sine", t + 0.1, 0.06, 0.06);
  },

  windowClose(ctx, dest) {
    const t = ctx.currentTime;
    // Soft descending slide-out
    const osc = ctx.createOscillator();
    const gain = createGain(ctx, 0.1);
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.12);
    osc.connect(gain);
    gain.connect(dest);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.start(t);
    osc.stop(t + 0.12);
  },

  windowMinimize(ctx, dest) {
    const t = ctx.currentTime;
    // Descending swoosh
    const osc = ctx.createOscillator();
    const gain = createGain(ctx, 0.08);
    osc.type = "sine";
    osc.frequency.setValueAtTime(700, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.15);
    osc.connect(gain);
    gain.connect(dest);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
  },

  windowRestore(ctx, dest) {
    const t = ctx.currentTime;
    // Ascending swoosh
    const osc = ctx.createOscillator();
    const gain = createGain(ctx, 0.08);
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(700, t + 0.15);
    osc.connect(gain);
    gain.connect(dest);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
  },

  windowMaximize(ctx, dest) {
    const t = ctx.currentTime;
    // Expansion pop
    playTone(ctx, dest, 500, "sine", t, 0.06, 0.1);
    playTone(ctx, dest, 800, "sine", t + 0.04, 0.1, 0.08);
  },

  windowFocus(ctx, dest) {
    const t = ctx.currentTime;
    // Very subtle tap
    playTone(ctx, dest, 600, "sine", t, 0.04, 0.04);
  },

  // ── Interactions ────────────────────────────────────────────────────────────
  toggleSwitch(ctx, dest) {
    const t = ctx.currentTime;
    // Mechanical click
    playTone(ctx, dest, 1000, "square", t, 0.025, 0.1);
    playTone(ctx, dest, 600, "sine", t + 0.015, 0.06, 0.06);
  },

  buttonClick(ctx, dest) {
    const t = ctx.currentTime;
    playTone(ctx, dest, 800, "sine", t, 0.04, 0.08);
  },

  tabSwitch(ctx, dest) {
    const t = ctx.currentTime;
    playTone(ctx, dest, 700, "triangle", t, 0.05, 0.07);
  },

  copyClipboard(ctx, dest) {
    const t = ctx.currentTime;
    // Snip sound: two quick clicks
    playTone(ctx, dest, 1200, "square", t, 0.02, 0.08);
    playTone(ctx, dest, 1400, "square", t + 0.04, 0.02, 0.06);
  },

  accentColorChange(ctx, dest) {
    const t = ctx.currentTime;
    // Bubbly color pop
    playTone(ctx, dest, 600, "sine", t, 0.08, 0.1);
    playTone(ctx, dest, 900, "sine", t + 0.04, 0.08, 0.08);
    playTone(ctx, dest, 1100, "sine", t + 0.08, 0.06, 0.05);
  },

  wallpaperChange(ctx, dest) {
    const t = ctx.currentTime;
    // Soft transition whoosh
    playNoise(ctx, dest, t, 0.2, 0.04);
    playTone(ctx, dest, 400, "sine", t + 0.05, 0.15, 0.06);
  },

  sliderChange(ctx, dest) {
    const t = ctx.currentTime;
    // Very subtle tick
    playTone(ctx, dest, 1000, "sine", t, 0.02, 0.05);
  },

  // ── Notifications ───────────────────────────────────────────────────────────
  error(ctx, dest) {
    const t = ctx.currentTime;
    // Two-tone descending error
    playTone(ctx, dest, 400, "square", t, 0.1, 0.12);
    playTone(ctx, dest, 300, "square", t + 0.12, 0.15, 0.1);
  },

  success(ctx, dest) {
    const t = ctx.currentTime;
    // Ascending two-note chime
    playTone(ctx, dest, 600, "sine", t, 0.1, 0.12);
    playTone(ctx, dest, 900, "sine", t + 0.1, 0.15, 0.1);
  },

  welcomeModal(ctx, dest) {
    const t = ctx.currentTime;
    // Gentle notification chime
    playTone(ctx, dest, 800, "sine", t, 0.15, 0.1);
    playTone(ctx, dest, 1000, "sine", t + 0.1, 0.15, 0.08);
    playTone(ctx, dest, 1200, "sine", t + 0.2, 0.2, 0.06);
  },

  newMessage(ctx, dest) {
    const t = ctx.currentTime;
    // Notification bubble: soft ascending double-ping
    playTone(ctx, dest, 880, "sine", t, 0.1, 0.1);
    playTone(ctx, dest, 1100, "sine", t + 0.12, 0.12, 0.08);
  },

  // ── App-specific ────────────────────────────────────────────────────────────
  terminalExecute(ctx, dest) {
    const t = ctx.currentTime;
    // Typewriter return: click + resonance
    playTone(ctx, dest, 500, "square", t, 0.02, 0.1);
    playTone(ctx, dest, 200, "sine", t + 0.02, 0.08, 0.06);
  },

  terminalError(ctx, dest) {
    const t = ctx.currentTime;
    // Soft buzzer
    playTone(ctx, dest, 150, "sawtooth", t, 0.12, 0.08);
  },

  terminalClear(ctx, dest) {
    const t = ctx.currentTime;
    // Sweep
    const osc = ctx.createOscillator();
    const gain = createGain(ctx, 0.06);
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.15);
    osc.connect(gain);
    gain.connect(dest);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
  },

  finderOpen(ctx, dest) {
    const t = ctx.currentTime;
    // Folder rustle: noise burst + soft tone
    playNoise(ctx, dest, t, 0.06, 0.04);
    playTone(ctx, dest, 500, "sine", t + 0.02, 0.08, 0.06);
  },

  finderNavigate(ctx, dest) {
    const t = ctx.currentTime;
    playTone(ctx, dest, 650, "sine", t, 0.05, 0.06);
  },

  fileDownload(ctx, dest) {
    const t = ctx.currentTime;
    // Completion ding
    playTone(ctx, dest, 800, "sine", t, 0.08, 0.12);
    playTone(ctx, dest, 1200, "sine", t + 0.08, 0.15, 0.08);
  },

  guestbookSubmit(ctx, dest) {
    const t = ctx.currentTime;
    // Message sent whoosh with chime
    playNoise(ctx, dest, t, 0.1, 0.03);
    playTone(ctx, dest, 700, "sine", t + 0.05, 0.12, 0.1);
    playTone(ctx, dest, 900, "sine", t + 0.1, 0.15, 0.07);
  },

  cardExpand(ctx, dest) {
    const t = ctx.currentTime;
    // Soft accordion open
    const osc = ctx.createOscillator();
    const gain = createGain(ctx, 0.06);
    osc.type = "sine";
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.1);
    osc.connect(gain);
    gain.connect(dest);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.start(t);
    osc.stop(t + 0.1);
  },

  cardCollapse(ctx, dest) {
    const t = ctx.currentTime;
    // Soft accordion close
    const osc = ctx.createOscillator();
    const gain = createGain(ctx, 0.06);
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.1);
    osc.connect(gain);
    gain.connect(dest);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.start(t);
    osc.stop(t + 0.1);
  },

  carouselSlide(ctx, dest) {
    const t = ctx.currentTime;
    // Slide swoosh
    playNoise(ctx, dest, t, 0.08, 0.03);
    playTone(ctx, dest, 500, "sine", t + 0.02, 0.06, 0.05);
  },
};

/**
 * Play a synthesized sound effect through the Web Audio API.
 * @param sound  The sound effect identifier
 * @param volume Master volume multiplier (0–1)
 */
export function synthesizeSound(sound: SoundEffect, volume: number): void {
  try {
    const ctx = getContext();
    // Create a master gain node for volume control
    const master = ctx.createGain();
    master.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), ctx.currentTime);
    master.connect(ctx.destination);
    sounds[sound](ctx, master);
  } catch {
    // Silently fail -- audio is a nice-to-have, not critical
  }
}
