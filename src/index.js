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

import { inputBPM } from './scripts/setters.js'

// import { changeNumberOfBars } from './scripts/changeBars.js';

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

// inputBPM()
// Tone.Transport.scheduleRepeat(repeat, "8n")

// Tone.Transport.start();
let index = 0;
let currentBPM = 120;

Tone.Transport.scheduleRepeat(repeat, "8n");

const bpmInput = document.querySelector('#bpmvalue');
bpmInput.addEventListener('input', () => {
  const bpmValue = parseInt(bpmInput.value, 10);
  Tone.Transport.bpm.value = bpmValue;
  currentBPM = bpmValue;
});

play.addEventListener('click', () => {
    Tone.Transport.start()
})

pause.addEventListener('click', () => {
    Tone.Transport.stop()
})

// function highlightCells(cells, step) {
//     for (let i = 0; i < cells.length; i++) {
//       let cell = cells[i];
//       if (cell.getAttribute('name') === step) {
//         cell.style.backgroundColor = '';
//       } else {
//         cell.style.backgroundColor = '';
//       }
//     }
//   }

    function repeat(time) {
        let step = index % 8;
        // highlightCells(cells, step);
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
        Tone.Transport.bpm.value = currentBPM;
    }

const sequencer = document.querySelector('.sequencer');
// const rows = sequencer.querySelectorAll('.instrument-row');
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

// const kickSampler = new Tone.Sampler({
//     urls: {
//       C1: "/Users/kinkatse/Desktop/FabeltonV2/Fableton/fireKick.wav"
//     },
//     onload: () => {
//       console.log("kick sample loaded");
//     }
//   }).toDestination();
  
//   document.querySelector("#sample").addEventListener("click", () => {
//     kickSampler.triggerAttackRelease("C1", "8n");
//   });
let isRainbowApplied = false;

function applyRainbow() {
    if (!isRainbowApplied) {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.classList.add('rainbow');
      });
    } else {
        resetColors();
    }
  }
  setInterval(applyRainbow, 2000); // Change colors every 2 seconds

  let idleTimer = null;
  let isIdle = true;
  
  // Function to change the colors of the sequencer cells
  function changeCellColors() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      // Change the cell color to a random color
      cell.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    });
  }
  
  // Start the idle timer when the page is loaded
  window.addEventListener('load', () => {
    idleTimer = setInterval(() => {
      // Check if the application is idle
      if (isIdle) {
        changeCellColors();
      }
    }, 1000); // Change the colors every 1 second
  });

  function resetColors() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.style.backgroundColor = '';
    });
  }

document.addEventListener('click', () => {
    // Reset the idle timer when the user interacts with the application
    console.log('User has clicked on the page');
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
      // Remove the letters from the cells
      snareCells[3].textContent = '';
      snareCells[4].textContent = '';
      snareCells[5].textContent = '';
      snareCells[6].textContent = '';
      snareCells[7].textContent = '';
    });
  });


  hiHatCells.forEach(cell => {
    cell.addEventListener('click', () => {
      // Remove the letters from the cells
      hiHatCells[0].textContent = '';
      hiHatCells[1].textContent = '';
      hiHatCells[2].textContent = '';
      hiHatCells[3].textContent = '';
      hiHatCells[4].textContent = '';
    });
  });

bassCells.forEach(cell => {
    cell.addEventListener('click', () => {
      // Remove the letters from the cells
      bassCells[4].textContent = '';
      bassCells[5].textContent = '';
      bassCells[6].textContent = '';
      bassCells[7].textContent = '';
    });
  });



// Select the sequencer container and the bars
const sequencerContainer = document.querySelector('.sequencer-container');
const bars = document.querySelectorAll('.instrument-row');

// Function to change the number of bars in the sequencer
function changeNumberOfBars(numBars) {
  // Remove all existing bars
  bars.forEach(bar => sequencerContainer.removeChild(bar));

  // Add the new number of bars
  for (let i = 0; i < numBars; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    sequencerContainer.appendChild(bar);
  }
}

// Get the select element and add an event listener to it
const select = document.querySelector('select');
select.addEventListener('change', (event) => {
  const numBars = parseInt(event.target.value);
  changeNumberOfBars(numBars);
});

