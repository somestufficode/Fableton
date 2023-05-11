
// import { pianoOut } from '../index.js';

import * as Tone from "tone";

export const pianoOut = new Tone.Gain().toDestination();


const keyToNote = {
    'q': 'C4',
    // 'a': 'C#4',
    'w': 'D4',
    // 's': 'D#4',
    'e': 'E4',
    'r': 'F4',
    // 'd': 'F#4',
    't': 'G4',
    // 'f': 'G#4',
    'y': 'A4',
    // 'g': 'A#4',
    'u': 'B4',
    'v': 'C5',
    // 'h': 'C#5',
    'b': 'D5',
    // 'j': 'D#5',
    'n': 'E5',
    'm': 'F5',
    // 'k': 'F#5',
    ',': 'G5',
    // 'l': 'G#5',
    '.': 'A5',
    // ';': 'A#5',
    '/': 'B5',
  };
  
  const notes = Object.values(keyToNote);
  
const pianoSynth = new Tone.Synth({
  oscillator: {
    type: 'sine' 
  },
  envelope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 1,
    release: 0.5
  }

}).connect(pianoOut);

// pianoSynth.volume.value = Tone.Destination.volume.value; 
  
document.addEventListener('keydown', e => {
  const noteHere = keyToNote[e.key];
  if (noteHere) {
    const noteID = document.querySelector(`.note.${noteHere}`);
    debugger 
    noteID.classList.add('playing');
    debugger 
    const duration = Tone.Time(Tone.context.currentTime).toSeconds();
    pianoSynth.triggerAttack(noteHere, Tone.context.currentTime, duration);
  }
});

document.addEventListener('keyup', e => {
  const noteHere = keyToNote[e.key];
  if (noteHere) {
    const noteID = document.querySelector(`.note.${noteHere}`);
    debugger 
    noteID.classList.remove('playing');
    pianoSynth.triggerRelease();
  }
});

  // const pianoRoll = document.querySelector('.piano-roll');
  // pianoRoll.addEventListener('click', e => {
  //   const note = e.target.dataset.note;
  //   if (note) {
  //       note.classList.toggle('active');
  //     pianoSynth.triggerAttack(note);
  //   }
  // });