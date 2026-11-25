function init() {
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

  function startGame() {
    const fieldHeight = document.getElementById("fieldHeight").value;
    const fieldWidth = document.getElementById("fieldWidth").value;
    const mineCount = document.getElementById("mineCount").value;
    const fieldContainer = document.getElementById("fieldContainer");

    let minesLeft = mineCount;
    const minesLeftDisplay = document.createElement("h4");
    minesLeftDisplay.innerText = `Pozostało bomb: ${minesLeft}`;
    fieldContainer.innerHTML = "";
    fieldContainer.append(minesLeftDisplay);

    const mines = randMinePos(fieldHeight, fieldWidth, mineCount);
    const table = createMineField(fieldHeight, fieldWidth, mines);

    const fieldBody = document.createElement("table");

    function fieldClick(field) {
      const x = parseInt(field.id.split("_")[1]);
      const y = parseInt(field.id.split("_")[0]);

      if (!field.classList.contains("clicked")) {
        if (table[y][x] == "M") {
          field.children[0].setAttribute("src", "img/bomb.png");
        } else if (table[y][x] == 0) {
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
              field.classList.add("clicked");
              fieldClick(document.getElementById(`${row}_${col}`));
              field.innerHTML = "";
            }
          }
        } else {
          field.innerHTML = table[y][x];
        }
        field.classList.add("clicked");
      }
    }
    function fieldRClick(field) {
      // const fieldId = this.parentElement.id.split(";");
      // const fieldValue = table[fieldId[0]][fieldId[1]];
      if (this.getAttribute("src") == "img/klepa.png") {
        this.setAttribute("src", "img/flaga.png");
        minesLeft--;
        this.removeEventListener("click", fieldClick);
      } else if (this.getAttribute("src") == "img/flaga.png") {
        this.setAttribute("src", "img/pyt.png");
        minesLeft++;
        this.removeEventListener("click", fieldClick);
      } else {
        this.setAttribute("src", "img/klepa.png");
        this.addEventListener("click", fieldClick);
      }
      minesLeftDisplay.innerText = `Pozostało bomb: ${minesLeft}`;
    }

    for (let r = 0; r < fieldHeight; r++) {
      const fieldRow = document.createElement("tr");
      for (let c = 0; c < fieldWidth; c++) {
        const fieldColumn = document.createElement("td");
        const colors = [
          "blue",
          "green",
          "red",
          "darkblue",
          "maroon",
          "teal",
          "black",
          "grey",
        ];
        if (table[r][c] != "M") {
          fieldColumn.style.color = colors[table[r][c] - 1];
        }
        fieldColumn.id = `${r}_${c}`;

        const fieldImage = document.createElement("img");
        fieldImage.setAttribute("class", "tile");
        fieldImage.setAttribute("src", "img/klepa.png");

        fieldImage.addEventListener("click", () => {
          fieldClick(fieldColumn);
        });
        fieldImage.addEventListener("contextmenu", (ev) => {
          ev.preventDefault();
          fieldRClick(fieldColumn);
        });
        fieldColumn.append(fieldImage);
        // fieldColumn.innerHTML = table[r][c];
        fieldRow.append(fieldColumn);
      }
      fieldBody.append(fieldRow);
    }
    fieldContainer.append(fieldBody);
  }

  document
    .getElementById("generateButton")
    .addEventListener("click", startGame);
}
