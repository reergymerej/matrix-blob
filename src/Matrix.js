function err(message) {
  throw new Error(message);
}

function allRowsValid(rows) {
  // Is each row an Array?
  return rows.find(row => !Array.isArray(row)) === undefined;
}

function allRowsSameLength(rows) {
  let length;
  return !rows.some(row => {
    if (length === undefined) {
      length = row.length;
      return false;
    } else {
      return row.length !== length;
    }
  });
}

/**
* We're using a simple matrix design for now.
* [
*   [0, 0, 0],
*   [0, 1, 1],
*   [0, 1, 0],
* ]
*/
function Matrix(rows) {
  if (!Array.isArray(rows)) {
    err('rows should be an Array');
  } else if (!allRowsSameLength(rows)) {
    err('inequal rows');
  } else if (!allRowsValid(rows)) {
    err('invalid row');
  }

  this.rows = rows;
  this.rowLength = this.rows[0].length;
}

Matrix.prototype.value = function (row, column) {
  return this.rows[row] && this.rows[row][column];
};

Matrix.prototype.exists = function (row, column) {
  return !!this.rows[row]
    && this.rows[row].hasOwnProperty(column);
};

Matrix.prototype.field = function (row, column) {
  const field = this.exists(row, column);
  return field
    ? {
      index: this.getIndexFromCoords(row, column),
      value: this.value(row, column),
    }
    : undefined;
};

Matrix.prototype.east = function (row, column) {
  return this.field(row, column + 1);
};

Matrix.prototype.south = function (row, column) {
  return this.field(row + 1, column);
};

Matrix.prototype.point = function (row, column) {
  return {
    index: this.getIndexFromCoords(row, column),
    value: this.value(row, column),
    east: this.east(row, column),
    south: this.south(row, column),
  };
};

// Walks matrix from [0, 0] by row, then column,
// passing each point.
Matrix.prototype.walk = function (fn) {
  this.rows.map((row, rowIndex) => {
    row.map((field, columnIndex) => {
      const point = this.point(rowIndex, columnIndex);
      return fn(point);
    });
  });
};

Matrix.prototype.getCoordsFromIndex = function (index) {
  if (index < 0 || index > this.rows.length * this.rowLength - 1) {
    err('out of range');
  }

  const row = Math.floor(index / this.rowLength);
  const column = index % this.rowLength;

  return [row, column];
};

Matrix.prototype.getIndexFromCoords = function (row, col) {
  return row * this.rowLength + col;
};

Matrix.prototype.print = function () {
  return this.rows.map(row => row.join('|')).join('\n');
};

Matrix.print = function (rows) {
  return new Matrix(rows).print();
};

export default Matrix;
