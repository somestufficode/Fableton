export function changeNumberOfBars() {
    const numberOfBars = document.getElementById('bars').value;
    const rows = document.querySelectorAll('.instrument-row');
    rows.forEach((row) => {
      // Calculate the current number of cells in the row
      const currentNumberOfCells = row.children.length;
      // Calculate the number of cells to add or remove
      const cellsToAddOrRemove = numberOfBars * 4 - currentNumberOfCells;
      if (cellsToAddOrRemove > 0) {
        // Add cells to the row
        for (let i = 0; i < cellsToAddOrRemove; i++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          row.appendChild(cell);
        }
      } else if (cellsToAddOrRemove < 0) {
        // Remove cells from the row
        for (let i = 0; i < -cellsToAddOrRemove; i++) {
          row.removeChild(row.lastChild);
        }
      }
    });
  }
  