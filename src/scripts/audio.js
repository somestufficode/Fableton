
//   import * as Tone from "tone";

import * as Tone from "tone"; 

export function playKick() {
  const kick = new Tone.Synth().toDestination();
  const now = Tone.now();
  kick.triggerAttack("C2", now);
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

// let loop; 

// export function playLoop() {
//   if (loop && loop.state === 'started') {
//     loop.stop();
//     loop = null;
//     return;
//   }
  
//   const synth = new Tone.Synth().toDestination();
//   loop = new Tone.Loop(function(time) {
//     synth.triggerAttackRelease("C1", "4n", time);
//   }, "4n");

//   loop.start(0);
//   Tone.Transport.start();
// }


