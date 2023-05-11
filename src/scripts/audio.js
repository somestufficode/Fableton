
//   import * as Tone from "tone";

import * as Tone from "tone"; 

export const beatsOut = new Tone.Gain().toDestination();

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
  }).connect(beatsOut);
  const now = Tone.now();
  hiHat.triggerAttackRelease('4n', now);
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



// export function playMelody() {
//       const synth = new Tone.PolySynth(Tone.Synth).toDestination();
//       const now = Tone.now()
//       synth.triggerAttack("D4");
//       synth.triggerAttack("F4", now + 0.5);
//       synth.triggerAttack("A4", now + 1);
//       synth.triggerAttack("C5", now + 1.5);
//       synth.triggerAttack("E5", now + 2);
//       synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
// }


// export function playMelody() {
//   const synth = new Tone.PolySynth(Tone.Synth).toDestination();
//   const now = Tone.now();
//   const beatsPerSecond = Tone.Transport.bpm.value/ 60;
//   const beatDuration = 1 / beatsPerSecond;
//   const noteDuration = beatDuration * 2;
//   const notes = ["D4", "F4", "A4", "C5", "E5"];

//   for (let i = 0; i < notes.length; i++) {
//     const noteTime = now + i * noteDuration;
//     synth.triggerAttack(notes[i], noteTime);
//     synth.triggerRelease(notes[i], noteTime + noteDuration);
//   }
// }



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


