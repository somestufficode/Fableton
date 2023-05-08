// index.js



import { playKick } from './scripts/audio.js';

import { playSnare } from './scripts/audio.js';

// import { playLoop } from './scripts/audio.js';

// import { playSample }  from './scripts/audio.js';

import * as Tone from "tone";

// Tone.Transport.start();
// Tone.Transport.bpm.value = 120;

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