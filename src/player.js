function playNoteInBrowser(note, duration) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Convert MIDI note to frequency
  const frequency = 440 * Math.pow(2, (note - 69) / 12);

  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine'; // Waveform type: sine, square, sawtooth, triangle
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration / 1000); // Stop after duration
}

// Function to play a sequence of notes
function playSequence(sequence) {
  let currentTime = 0;

  sequence.forEach(({ note, duration }) => {
    setTimeout(() => playNoteInBrowser(note, duration), currentTime);
    currentTime += duration;
  });
}

export function setupPlayer(element) {
  // A sequence of MIDI notes (C4, D4, E4, F4)
  const sequence = [
    { note: 60, duration: 500 }, // C4, 500ms
    { note: 62, duration: 500 }, // D4, 500ms
    { note: 64, duration: 500 }, // E4, 500ms
    { note: 65, duration: 500 }, // F4, 500ms
    { note: 60, duration: 500 }, // C4, 500ms
    { note: 62, duration: 500 }, // D4, 500ms
    { note: 64, duration: 500 }, // E4, 500ms
    { note: 65, duration: 500 }, // F4, 500ms
  ];

  element.addEventListener("click", () => {
    playSequence(sequence);
  });
}
