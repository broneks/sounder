import { heartbeat } from 'webdaw-modules';

export async function setupPlayer(element) {
  await heartbeat.ready();

  const events = heartbeat.util.getRandomNotes({
      minNoteNumber: 60,
      maxNoteNumber: 100,
      minVelocity: 30,
      maxVelocity: 80,
      numNotes: 60
  });

  const part = heartbeat.createPart();
  part.addEvents(events);

  const song = heartbeat.createSong({
    parts: part,
    useMetronome: true
  });

  element.addEventListener('click', () => {
    song.play();
  });
}
