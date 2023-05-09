import * as Tone from "tone";
let index = 0;
export function repeat(time) {
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