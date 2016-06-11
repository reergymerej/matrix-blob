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
    value: this.value(row, column),
    east: this.east(row, column),
    south: this.south(row, column),
  };
};

// Walks matrix from [0, 0] by row, then column,
// passing each value and unique index.
Matrix.prototype.walk = function (fn) {
  let i = 0;
  this.rows.map((row, rowIndex) => {
    row.map((field, columnIndex) => {
      const point = this.point(rowIndex, columnIndex);
      return fn(point, i++);
    });
  });
};

Matrix.prototype.getCoordsFromIndex = function (index) {
  if (index < 0 || index > this.rows.length * this.rowLength - 1) {
    err('out of range');
  }

  const rowIndex = Math.floor(index / this.rowLength);
  const columnIndex = index % this.rowLength;

  return [rowIndex, columnIndex];
};

export default Matrix;
