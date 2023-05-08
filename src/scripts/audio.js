
//   import * as Tone from "tone";

// export function playSound() {
//     const synth = new Tone.Synth().toDestination();
//     const now = Tone.now()
// // trigger the attack immediately
//     synth.triggerAttack("C4", now)
// // wait one second before triggering the release
//     synth.triggerRelease(now + 1)
// }

import * as Tone from "tone"; 

export function playKick() {
  const kick = new Tone.Synth().toDestination();
  const now = Tone.now();
  // trigger the attack immediately
  kick.triggerAttack("C2", now);
  // wait one second before triggering the release
  kick.triggerRelease(now + 1);
}


export function playSnare() {
    const snareDrum = new Tone.NoiseSynth().toDestination();
      const now = Tone.now();
      snareDrum.triggerAttackRelease('8n', now);
}

export function playHiHat() {
  const hiHat = new Tone.MetalSynth({
    frequency: 2000,
    envelope: {
      attack: 0.001,
      decay: 0.1,
      release: 0.5
    },
    harmonicity: 5.1,
    resonance: 400,
    modulationIndex: 32,
    octaves: 1.5
  }).toDestination();
  const now = Tone.now();
  hiHat.triggerAttackRelease('8n', now);
}

export function playBass() {
    const bass = new Tone.MembraneSynth({
      pitchDecay: 0.008,
      octaves: 2,
      envelope: {
        attack: 0.001,
        decay: 0.5,
        sustain: 0.1,
        release: 1
      }
    }).toDestination();
    const now = Tone.now();
    bass.triggerAttackRelease("C1", "8n", now);
}

// const snareDrum = new Tone.NoiseSynth().toDestination();
//   const now = Tone.now();
//   // set the loop property to true and duration to '8n'
//   snareDrum.triggerAttackRelease('8n', now, undefined, undefined, true);


    // function playSound() {
    //     const player = new Tone.Player("/Users/kinkatse/Desktop/Fableton/drums/Old Kicks/fire.wav").toDestination();
    //         Tone.loaded().then(() => {
    //             player.start();
    //     });
    // };

let loop; 

export function playLoop() {
  if (loop && loop.state === 'started') {
    loop.stop();
    loop = null;
    return;
  }
  
  const synth = new Tone.Synth().toDestination();
  loop = new Tone.Loop(function(time) {
    synth.triggerAttackRelease("C1", "8n", time);
  }, "4n");

  loop.start(0);
  Tone.Transport.start();
}


// document.addEventListener('DOMContentLoaded', () => {
//     const testCase = document.querySelector('#testCase');
//     const testCase2 = document.querySelector('#testCase2');
//     const testCase3 = document.querySelector('#testCase3');
//     testCase.addEventListener('click', () => {
//             testCase.classList.toggle('active');
//             playKick();
//     });
//     testCase2.addEventListener('click', () => {
//             testCase2.classList.toggle('active');
//             playLoop();
//     });
//     testCase3.addEventListener('click', () => {
//             testCase3.classList.toggle('active');
//             playSnare();
//     });
//   });


