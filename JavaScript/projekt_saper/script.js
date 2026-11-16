const generate = document.getElementById("generateButton");

function randMinePos(rows, cols, count) {
  let mines = [];
  while (mines.length < count) {
    const randRow = Math.floor(Math.random() * rows);
    const randCol = Math.floor(Math.random() * cols);

    let duplicate = false;
    for (const m of mines) {
      if (m[0] === randRow && m[1] === randCol) {
        duplicate = true;
        break;
      }
    }
    if (duplicate) continue;
    mines.push([randRow, randCol]);
  }
  return mines;
}

function fieldCreateTable(rows, cols) {
  let table = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    table.push(row);
  }
  return table;
}

function fieldAddMines(field, mines) {
  mines.forEach((mine) => {
    const x = mine[0];
    const y = mine[1];

    field[y][x] = "M";

    //     if (y < field.length - 1) {
    //       field[y + 1][x]++;
    //       if (x < field.length - 1) {
    //         field[y + 1][x + 1]++;
    //       }
    //       if (x > 0) {
    //         field[y + 1][x - 1]++;
    //       }
    //     }
    //     if (y > 0) {
    //       field[y - 1][x]++;
    //       if (x < field.length - 1) {
    //         field[y - 1][x + 1]++;
    //       }
    //       if (x > 0) {
    //         field[y - 1][x - 1]++;
    //       }
    //     }
    //     if (x < field.length - 1) {
    //       field[y][x + 1]++;
    //     }
    //     if (x > 0) {
    //       field[y][x - 1]++;
    //     }
  });
}

// function fieldClick() {
//   this.setAttribute("src", "img/pbomb.png");
//   this.removeEventListener("click", fieldClick);
// }
// function fieldRClick() {}

function displayGame() {
  const fieldHeight = document.getElementById("fieldHeight").value;
  const fieldWidth = document.getElementById("fieldWidth").value;
  const mineCount = document.getElementById("mineCount").value;

  const field = document.createElement("table");

  let table = fieldCreateTable(fieldHeight, fieldWidth);
  const mines = randMinePos(fieldHeight, fieldWidth, mineCount);
  fieldAddMines(table, mines);
  console.log(table);

  for (let i = 0; i < fieldHeight; i++) {
    const fieldRow = document.createElement("tr");
    for (let j = 0; j < fieldWidth; j++) {
      const fieldColumn = document.createElement("td");
      fieldColumn.innerText = table[i][j];
      //   const fieldImage = document.createElement("img");
      //   fieldImage.setAttribute("class", "tile");
      //   fieldImage.setAttribute("src", "img/klepa.png");
      //   fieldImage.addEventListener("click", fieldClick);
      //   fieldImage.addEventListener("contextmenu", fieldRClick);
      //   fieldColumn.append(fieldImage);
      fieldRow.append(fieldColumn);
    }
    field.append(fieldRow);
  }
  document.body.append(field);
}

generate.addEventListener("click", displayGame);
