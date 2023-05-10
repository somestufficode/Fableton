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

Tone.Transport.scheduleRepeat(repeat, "4n");
// BPM Change
const bpmInput = document.querySelector('#bpmvalue');
bpmInput.addEventListener('input', () => {
  const bpmValue = parseInt(bpmInput.value, 10);
  Tone.Transport.bpm.value = bpmValue;
  currentBPM = bpmValue;
});

// Volume Change

// const gainNode = new Tone.Gain(0.5);
// const volumeInput = document.querySelector('#volumeinput');
// gainNode.gain.value = volumeInput.value;
// gainNode.toDestination();

// volumeInput.addEventListener('input', () => {
//   const volumeValue = parseFloat(volumeInput.value);
//   gainNode.gain.value = volumeValue;
// });

// VOLUME

Tone.Destination.volume.value = 100;

// adjust volume with a slider input
const volumeInput = document.querySelector('#volumeinput');
volumeInput.addEventListener('input', () => {
  const volumeValue = parseFloat(volumeInput.value);
  Tone.Destination.volume.value = volumeValue;
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
    // console.log(Tone.Transport.position);
})

// Pause
pause.addEventListener('click', () => {
    Tone.Transport.pause();
    // console.log(Tone.Transport.position);
})

// stopSeq.addEventListener('click', () => {
//     Tone.Transport.stop();
//     console.log(Tone.Transport.position);
// })

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

// const cell = document.querySelector('td');

// Get the name attribute value
// const nameValue = cell.getAttribute('name');

// Sequence Function
    function repeat(time) {
        let step = index % 8;
        // highlightCells(cells, step);
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            let tick = i % 8;
            let nameValue = cell.getAttribute('name');
            if (nameValue == step) {
                    // cell.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
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



// Rainbow CSS

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
      cell.classList.remove('rainbow');
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



// // Select the sequencer container and the bars
// const sequencerContainer = document.querySelector('.sequencer-container');
// const bars = document.querySelectorAll('.instrument-row');

// // Function to change the number of bars in the sequencer
// function changeNumberOfBars(numBars) {
//   // Remove all existing bars
//   bars.forEach(bar => sequencerContainer.removeChild(bar));

//   // Add the new number of bars
//   for (let i = 0; i < numBars; i++) {
//     const bar = document.createElement('div');
//     bar.classList.add('bar');
//     sequencerContainer.appendChild(bar);
//   }
// }

// // Get the select element and add an event listener to it
// const select = document.querySelector('select');
// select.addEventListener('change', (event) => {
//   const numBars = parseInt(event.target.value);
//   changeNumberOfBars(numBars);
// });



const clientId = 's2LqsOEkHax6OyahsquR';
const apiKey = 'XkqPvImGC9FxPkZMj1LXWZQXj8ouB5ZYAMFwCkvn';
const searchQuery = 'kick'; // example search query for kicks
const resultsPerPage = 10; // number of results to return per page
const sort = 'downloads_desc'; // sort by most downloaded

fetch(`https://freesound.org/apiv2/search/text/?query=${searchQuery}&page_size=${resultsPerPage}&sort=${sort}&token=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data.results);
    // do something with the search results
  })
  .catch(error => {
    console.error(error);
  });


