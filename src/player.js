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

const notes = [
  36,
  38,
  40,
  41,
  43,
  45,
  47,
  48,
  50,
  52,
  53,
  55,
  57,
  59,
  60,
  62,
  64,
  65,
  67,
  69,
  71,
  72,
].map((note) => note + 12)

const data = [
  -2.6,
  -2.8,
  -2.9,
  -2.7,
  -2.5,
  -2.2,
  -2.4,
  -2.8,
  -2.8,
  -2.1,
  -0.6,
  0.4,
  1.0,
  1.6,
  1.4,
  0.9,
  0.4,
  -0.1,
  -0.8,
  -1.1,
  -1.2,
  -1.1,
  -1.1,
  -1.4,
  -2.1,
  -2.2,
  -2.6,
  -2.8,
  -3.1,
  -3.6,
  -3.7,
  -3.8,
  -4.1,
  -2.8,
  -1.7,
  -0.5,
  1.1,
  2.0,
  2.4,
  2.2,
  1.5,
  -0.2,
  -0.4,
  -0.8,
  -0.7,
  -0.8,
  -0.7,
  -0.9,
  -1.1,
  -1.3,
  -2.0,
  -2.6,
  -3.1,
  -2.8,
  -3.0,
  -3.6,
  -1.6,
  -1.2,
  -0.4,
  0.2,
  0.7,
  1.2,
  1.5,
  1.1,
  0.5,
  -0.0,
  -0.4,
  -0.6,
  -0.7,
  -0.4,
  -0.1,
  -0.2,
  -0.0,
  -0.1,
  0.1,
  0.0,
  -0.0,
  0.0,
  -0.2,
  -1.1,
  -1.3,
  -0.0,
  0.9,
  1.0,
  1.6,
  1.6,
  1.4,
  2.1,
  1.5,
  2.0,
  1.9,
  2.4,
  3.0,
  2.8,
  2.3,
  1.8,
  0.9,
  0.5,
  -0.2,
  -0.4,
  -0.8,
  -1.6,
  -1.9,
  -1.8,
  -2.2,
  -1.8,
  -1.5,
  -1.4,
  -0.7,
  0.1,
  -0.3,
  -0.4,
  -0.9,
  -1.0,
  -1.4,
  -1.3,
  -1.5,
  -1.8,
  -2.1,
  -2.5,
  -2.9,
  -3.3,
  -3.5,
  -3.7,
  -3.9,
  -4.0,
  -4.1,
  -4.1,
  -4.0,
  -3.9,
  -3.6,
  -2.9,
  -2.2,
  -1.6,
  -1.6,
  -1.8,
  -2.0,
  -2.1,
  -2.2,
  -2.3,
  -2.4,
  -2.6,
  -2.6,
  -2.6,
  -2.4,
  -2.3,
  -2.3,
  -2.2,
  -2.1,
  -1.8,
  -1.4,
  -1.0,
  -0.4,
  0.3,
  0.7,
  0.6,
  0.2,
  -0.0,
  0.0,
  0.2,
  0.4,
  0.4,
  0.3,
  0.3,
  0.3,
  0.4,
  0.2,
  -0.3
]

function mapListToRange(inputList, outputMin, outputMax) {
  // Find the min and max of the input list
  const inputMin = Math.min(...inputList);
  const inputMax = Math.max(...inputList);

  // Map each value in the input list to the new range [outputMin, outputMax]
  return inputList.map(value => {
    return Math.round((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin)
  });
}

export function setupPlayer(element) {
  const sequence = mapListToRange(data, notes.at(0), notes.at(-1)).map((note) => ({
    note,
    duration: 500,
  }));

  element.addEventListener("click", () => {
    playSequence(sequence)
  });
}
