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

import { inputBPM } from './scripts/setters.js';

import { playMelody } from './scripts/audio.js';

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

let index = 0;
let currentBPM = 120;

Tone.Transport.scheduleRepeat(repeat, "4n");

// Schedule the melody function to play at the beginning of each loop
// Tone.Transport.schedule((time) => {
//   melodyLoop = setInterval(playMelody, 60000/currentBPM);
// }, "0");

// Stop the melody function at the end of each loop
// Tone.Transport.schedule((time) => {
//   clearInterval(melodyLoop);
// }, "4n - 0");

// BPM Change
const bpmInput = document.querySelector('#bpmvalue');
bpmInput.addEventListener('input', () => {
  const bpmValue = parseInt(bpmInput.value, 10);
  Tone.Transport.bpm.value = bpmValue;
  currentBPM = bpmValue;
});

// click function on Melody Bar 
// let isPlaying = false;
// let melodyLoop; 

// const melodyBar = document.querySelector('.melody');

// Play the melody when the melody bar is clicked
// melodyBar.addEventListener('click', () => {
//   if (!isPlaying) {
//     startMelody();
//   } else {
//     stopMelody();
//   }
// });

// function startMelody() {
//   if (isPlaying) return;
  
//   Tone.Transport.stop();
//   Tone.Transport.position = 0;
//   Tone.Transport.start();

//   melodyLoop = setInterval(() => {
//     playMelody();
//   }, 60000 / Tone.Transport.bpm.value);

//   isPlaying = true;
// }

// function stopMelody() {
//   if (!isPlaying) return;

//   Tone.Transport.stop();
//   clearInterval(melodyLoop);
  
//   isPlaying = false;
// }



// VOLUME
Tone.Destination.volume.value = 20;

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
})

// Pause
pause.addEventListener('click', () => {
    Tone.Transport.pause();
})

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



  // const apiKey = 'XkqPvImGC9FxPkZMj1LXWZQXj8ouB5ZYAMFwCkvn';
  // const searchQuery = 'kick';
  // const resultsPerPage = 10;
  // const sort = 'downloads_desc';
  // const dropDown = document.querySelector('#sound-select');
  // fetch(`https://freesound.org/apiv2/search/text/?query=${searchQuery}&sort=${sort}&page_size=${resultsPerPage}`, {
  //   headers: {
  //     'Authorization': `Token ${apiKey}`
  //   }
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     const soundArray = data.results;
  //     debugger 
  //     soundArray.forEach(sound => {

  //       const redirectUrl = `https://cdn.freesound.org/previews/1/1234_600-hq.mp3`;
  //       window.location.href = redirectUrl;
  //       const option = document.createElement('option');
  //       debugger 
  //       option.text = sound.name;
  //       option.id = sound.id;
  //       debugger 
  //       option.sound = sound.preview
  //       debugger 
  //       dropDown.add(option);
  //       option.addEventListener('click', () => {
  //         const redirectUrl = `https://freesound.org/apiv2/${sound.id}/previews`;
  //         https://cdn.freesound.org/previews/1/1234_600-hq.mp3
  //         window.location.href = redirectUrl;
  //       })
  //     });
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });


