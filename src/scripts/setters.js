import * as Tone from "tone";


export function inputBPM() {
    const bpmValue = document.querySelector("#bpmvalue").value;
    Tone.Transport.bpm.value = parseInt(bpmValue);
  }