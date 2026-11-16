function fieldAddMines(field, mines) {
  mines.forEach((mine) => {
    const y = mine[0];
    const x = mine[1];

    field[y][x] = "M";

    if (y < field.length - 1) {
      field[y + 1][x]++;
      if (x < field.length - 1) {
        field[y + 1][x + 1]++;
      }
      if (x > 0) {
        field[y + 1][x - 1]++;
      }
    }
    if (y > 0) {
      field[y - 1][x]++;
      if (x < field.length - 1) {
        field[y - 1][x + 1]++;
      }
      if (x > 0) {
        field[y - 1][x - 1]++;
      }
    }
    if (x < field.length - 1) {
      field[y][x + 1]++;
    }
    if (x > 0) {
      field[y][x - 1]++;
    }
  });
}
