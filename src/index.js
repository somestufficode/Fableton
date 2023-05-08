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