// index.js

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

import { playKick } from './scripts/audio.js';

import { playSnare } from './scripts/audio.js';

import { playBass } from './scripts/audio.js';

import { playHiHat }  from './scripts/audio.js';

import * as Tone from "tone";


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

  
//   const playButton = document.querySelector('#play');
//     playButton.addEventListener('click', () => {
//     Tone.start().then(() => {
//         Tone.Transport.start()
//     });

    // });

//   const pauseButton = document.querySelector('#pause');
//     pauseButton.addEventListener('click', () => {
//     Tone.start().then(() => {
//         Tone.Transport.stop()
//     });

//     });


let index = 0;

Tone.Transport.bpm.value = 200
Tone.Transport.scheduleRepeat(repeat, "4n")

play.addEventListener('click', async () => {
    Tone.Transport.start()
})

pause.addEventListener('click', async () => {
    Tone.Transport.stop()
})



    function repeat(time) {
        let step = index % 8;
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            let tick = i % 8;
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
    }

// const sequencer = document.querySelector('.sequencer');
// const cells = sequencer.querySelectorAll('.cell');

// for (let i = 0; i < cells.length; i++) {
//   const columnIndex = i % 8;
//   const columnCells = sequencer.querySelectorAll(`.cell:nth-child(${columnIndex + 1})`);
  
//   for (let j = 0; j < columnCells.length; j++) {
//     const cell = columnCells[j];
//     // do something with the cell

//   }
// }

const sequencer = document.querySelector('.sequencer');
const rows = sequencer.querySelectorAll('.instrument-row');
const cells = sequencer.querySelectorAll('.cell');

// Tone.Transport.scheduleRepeat((time) => {
//   cells.forEach((cell, index) => {
//     const tick = Tone.Transport.ticks % cells.length;
//     if (index === tick) {
//       cell.style.backgroundColor = 'green';
//     } else {
//       cell.style.backgroundColor = 'white';
//     }
//   });
// }, '4n');
