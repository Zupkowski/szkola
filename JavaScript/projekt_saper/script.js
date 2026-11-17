function randMinePos(rows, cols, mineCount) {
  let minesPos = [];
  while (minesPos.length < mineCount) {
    const randRow = Math.floor(Math.random() * rows);
    const randCol = Math.floor(Math.random() * cols);

    let dup = false;
    for (let i = 0; i < minesPos.length; i++) {
      if (minesPos[i][0] == randRow && minesPos[i][1] == randCol) {
        dup = true;
        break;
      }
    }
    if (dup) continue;
    minesPos.push([randRow, randCol]);
  }
  return minesPos;
}

function createMineField(rows, cols, mines) {
  let table = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push(0);
    }
    table.push(row);
  }

  mines.forEach((m) => {
    const x = m[1];
    const y = m[0];

    table[y][x] = "M";

    for (let v = -1; v < 2; v++) {
      for (let h = -1; h < 2; h++) {
        const row = y + v;
        const col = x + h;
        if (
          row < 0 ||
          row > table.length - 1 ||
          col < 0 ||
          col > table[0].length - 1
        )
          continue;
        if (table[row][col] == "M") continue;
        table[row][col]++;
      }
    }
  });
  return table;
}

function fieldClick() {
  this.setAttribute("src", "img/pbomb.png");
  this.removeEventListener("click", fieldClick);
}
function fieldRClick() {}

function startGame() {
  const fieldHeight = document.getElementById("fieldHeight").value;
  const fieldWidth = document.getElementById("fieldWidth").value;
  const mineCount = document.getElementById("mineCount").value;
  const fieldContainer = document.getElementById("fieldContainer");

  let timeElapsedCounter = 0;
  let timer = "";

  const timeSince = document.createElement("h4");
  timeSince.innerText = "Grasz: 0[s]";

  fieldContainer.innerHTML = "";
  clearInterval(timer);

  timer = setInterval(() => {
    timeElapsedCounter++;
    timeSince.innerText = `Grasz: ${timeElapsedCounter}[s]`;
  }, 1000);
  fieldContainer.append(timeSince);

  const table = createMineField(
    fieldHeight,
    fieldWidth,
    randMinePos(fieldHeight, fieldWidth, mineCount),
  );

  const fieldBody = document.createElement("table");

  for (let r = 0; r < fieldHeight; r++) {
    const fieldRow = document.createElement("tr");
    for (let c = 0; c < fieldWidth; c++) {
      const fieldColumn = document.createElement("td");
      const colors = ["blue", "green", "red", "orange"];
      if (table[r][c] != "M") {
        fieldColumn.style.color = colors[table[r][c]];
      }
      fieldColumn.innerText = table[r][c];
      // const fieldImage = document.createElement("img");
      // fieldImage.setAttribute("class", "tile");
      // fieldImage.setAttribute("src", "img/klepa.png");
      // fieldImage.addEventListener("click", fieldClick);
      // fieldImage.addEventListener("contextmenu", fieldRClick);
      // fieldColumn.append(fieldImage);
      fieldRow.append(fieldColumn);
    }
    fieldBody.append(fieldRow);
  }
  fieldContainer.append(fieldBody);
}

document.getElementById("generateButton").addEventListener("click", startGame);
