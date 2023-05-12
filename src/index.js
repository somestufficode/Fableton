// index.js

// import * as piano from "./scripts/piano.js";
// import * as audio from "./scripts/audio.js";


// import { beatsOut } from './scripts/audio.js';
// import { pianoOut } from './scripts/piano.js';

import * as Tone from 'tone';

// import { EQ } from 'tone';

// const beatsOut = new Tone.Gain().toDestination();
// const pianoOut = new Tone.Gain().toDestination();
// // MASTERING
// const master = Tone.Destination.chain(pianoOut, beatsOut);

const compressor = new Tone.Compressor({
  threshold: -24,
  ratio: 6,
  attack: 0.3,
  release: 0.1
}).toDestination();

const master = new Tone.Gain().connect(compressor);

const limiter = new Tone.Limiter(-6).connect(master);

const beatsOut = new Tone.Gain(0.5).connect(limiter);
const pianoOut = new Tone.Gain(0.5).connect(limiter);

const reverb = new Tone.Freeverb({
  roomSize  : 0.7 ,
  dampening  : 8000
  });
  const feedbackDelay = new Tone.FeedbackDelay({
  delayTime  : "32n",
    feedback : 0.25
  });

  pianoOut.chain(reverb, feedbackDelay);

beatsOut.gain.value = -20;
pianoOut.gain.value = -40;


// mouseClearing Functionality 

let isClearing = false;

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('mousedown', () => {
    isClearing = true;
  });

  cell.addEventListener('mouseup', () => {
    isClearing = false;
  });

  cell.addEventListener('mousemove', () => {
    if (isClearing) {
      cell.classList.remove('active');
    }
  });
});


// import sound Functionality 

// import { playKick } from './scripts/audio.js';

// import { playSnare } from './scripts/audio.js';

// import { playBass } from './scripts/audio.js';

// import { playHiHat } from './scripts/audio.js';

// import { inputBPM } from './scripts/setters.js';

// import { playMelody } from './scripts/audio.js';

// MASTERING 


// Select Rows 
// allow Sound Functionality 

const kickRow = document.querySelector(".kick");
const kickCells = kickRow.querySelectorAll("div");

kickCells.forEach((kickCell) => {
  kickCell.addEventListener("click", () => {
    kickCell.classList.toggle('active');
    playKick();
  });
});

const snareRow = document.querySelector(".snare");
const snareCells = snareRow.querySelectorAll("div");

snareCells.forEach((snareCell) => {
  snareCell.addEventListener("click", () => {
    snareCell.classList.toggle('active');
    playSnare();
  });
});

const hiHatRow = document.querySelector(".hi-hat");
const hiHatCells = hiHatRow.querySelectorAll("div");

hiHatCells.forEach((hiHatCell) => {
  hiHatCell.addEventListener("click", () => {
    hiHatCell.classList.toggle('active');
    playHiHat();
  });
});

const bassRow = document.querySelector(".bass");
const bassCells = bassRow.querySelectorAll("div");

bassCells.forEach((bassCell) => {
  bassCell.addEventListener("click", () => {
    bassCell.classList.toggle('active');
    playBass();
  });
});

let index = 0;
let currentBPM = 120;

Tone.Transport.scheduleRepeat(repeat, "8n");

// BPM Change
const bpmInput = document.querySelector('#bpmvalue');
bpmInput.addEventListener('input', () => {
  const bpmValue = parseInt(bpmInput.value, 10);
  Tone.Transport.bpm.value = bpmValue;
  currentBPM = bpmValue;
});


// VOLUME
master.gain.value = 50;

const volumeInput = document.querySelector('#volumeinput');
volumeInput.addEventListener('input', () => {
  const volumeValue = parseFloat(volumeInput.value);
  master.gain.value = volumeValue;
});

// MUTE 
mute.addEventListener('click', () => {
  Tone.Destination.mute = true;
})

// Play 
play.addEventListener('click', () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
  Tone.Transport.start();
})

// Pause
pause.addEventListener('click', () => {
  Tone.Transport.pause();
})

document.addEventListener('keydown', e => {
  if (e.key === ' ') {
    Tone.Transport.pause();
  }
});

// Sequence Function
function repeat(time) {
  let step = index % 16;
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    let tick = i % 16;
    let nameValue = cell.getAttribute('name');
    if (nameValue == step) {
      cell.style.backgroundColor = 'black';
      cell.classList.add('current-column');
    } else {
      cell.style.backgroundColor = '';
      cell.classList.remove('current-column');
    }
    if (cell.classList.contains('active') && tick === step) {
      if (cell.parentElement.classList.contains('kick')) {
        playKick();
      } else if (cell.parentElement.classList.contains('snare')) {
        playSnare();
      } else if (cell.parentElement.classList.contains('hi-hat')) {
        playHiHat();
      } else if (cell.parentElement.classList.contains('bass')) {
        playBass();
      }
    }

  }
  index++;
  Tone.Transport.bpm.value = currentBPM;
}

const sequencer = document.querySelector('.sequencer');
const cells = sequencer.querySelectorAll('.cell');

// Rainbow CSS
let isRainbowApplied = false;

function applyRainbow() {
  if (!isRainbowApplied) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.classList.add('rainbow');
    });
    // melodyBar.classList.add('rainbow');
  } else {
    resetColors();
  }
}
setInterval(applyRainbow, 2000);
let idleTimer = null;
let isIdle = true;

// Function to change the colors of the sequencer cells
function changeCellColors() {
  const cells = document.querySelectorAll('.cell');
  const melodyBar = document.querySelector('.melody')
  cells.forEach((cell) => {
    // Change the cell color to a random color
    cell.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  });
  // melodyBar.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Start the idle timer when the page is loaded
window.addEventListener('load', () => {
  idleTimer = setInterval(() => {
    if (isIdle) {
      changeCellColors();
    }
  }, 1000); 
});

function resetColors() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.style.backgroundColor = '';
    cell.classList.remove('rainbow');
  });
  // melodyBar.style.backgroundColor = '';
  // melodyBar.classList.remove('rainbow');
}

document.addEventListener('click', () => {
  // Reset the idle timer when the user interacts with the application
  // console.log('User has clicked on the page');
  isIdle = false;
  isRainbowApplied = true;
  idleTimer = null;
  resetColors();

});

kickCells.forEach(cell => {
  cell.addEventListener('click', () => {
    // Remove the letters from the cells
    kickCells[0].textContent = '';
    kickCells[1].textContent = '';
    kickCells[2].textContent = '';
    kickCells[3].textContent = '';
  });
});


snareCells.forEach(cell => {
  cell.addEventListener('click', () => {
    snareCells[3].textContent = '';
    snareCells[4].textContent = '';
    snareCells[5].textContent = '';
    snareCells[6].textContent = '';
    snareCells[7].textContent = '';
  });
});


hiHatCells.forEach(cell => {
  cell.addEventListener('click', () => {
    hiHatCells[7].textContent = '';
    hiHatCells[8].textContent = '';
    hiHatCells[9].textContent = '';
    hiHatCells[10].textContent = '';
    hiHatCells[11].textContent = '';
    hiHatCells[12].textContent = '';
  });
});

bassCells.forEach(cell => {
  cell.addEventListener('click', () => {
    bassCells[12].textContent = '';
    bassCells[13].textContent = '';
    bassCells[14].textContent = '';
    bassCells[15].textContent = '';
  });
});

// Beat Sequencer 

export function playBass() {
  const bass = new Tone.Synth().connect(beatsOut);
  const now = Tone.now();
  bass.triggerAttack("C2", now);
  bass.triggerRelease(now + 1);
}


export function playSnare() {
    const snareDrum = new Tone.NoiseSynth().connect(beatsOut);
      const now = Tone.now();
      snareDrum.triggerAttackRelease('4n', now);
      
}

export function playHiHat() {
  const hiHat = new Tone.NoiseSynth({
    noise: {
      type: "pink",
      playbackRate: 3
    },
    envelope: {
      attack: 0.001,
      decay: 0.05,
      sustain: 0.001,
      release: 0.05
    }
  }).connect(beatsOut);

  const now = Tone.now();
  hiHat.triggerAttackRelease("4n", now);
}

export function playKick() {
    const kick = new Tone.MembraneSynth({
      pitchDecay: 0.008,
      octaves: 2,
      envelope: {
        attack: 0.001,
        decay: 0.5,
        sustain: 0.1,
        release: 1
      }
    }).connect(beatsOut);
    const now = Tone.now();
    kick.triggerAttackRelease("C1", "4n", now);
}

beatsOut.gain.value = -30;

// Piano Roll

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
  sustain: 1.0,
  release: 0.1,
  decay: 0.1
}

}).connect(pianoOut);

pianoSynth.volume.value = -50;


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
