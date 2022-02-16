let currentNote = 0; // The note we are currently playing
let nextNoteTime = 0.0; // when the next note is due.
function nextNote(tempo: number) {
  const secondsPerBeat = 60.0 / tempo;

  nextNoteTime += secondsPerBeat; // Add beat length to last beat time

  // Advance the beat number, wrap to zero
  currentNote++;
  if (currentNote === 4) {
    currentNote = 0;
  }
}

const audioCtx = new AudioContext();
const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)

let timerID;
export function scheduler() {
  // while there are notes that will need to play before the next interval,
  // schedule them and advance the pointer.
  while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
    // scheduleNote(currentNote, nextNoteTime);
    // nextNote();
  }
  timerID = window.setTimeout(scheduler, lookahead);
}
