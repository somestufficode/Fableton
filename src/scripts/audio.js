
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
      // set the loop property to true and duration to '8n'
      snareDrum.triggerAttackRelease('8n', now);
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

let loop; // declare the loop variable outside the function

export function playLoop() {
  // check if the loop is already playing, if it is, stop it
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


document.addEventListener('DOMContentLoaded', () => {
    const testCase = document.querySelector('#testCase');
    const testCase2 = document.querySelector('#testCase2')
    testCase.addEventListener('click', () => {
            testCase.classList.toggle('active');
            playKick();
    });
    testCase2.addEventListener('click', () => {
            testCase2.classList.toggle('active');
            playLoop();
    })
  });


