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
}

Matrix.prototype.value = function (row, column) {
  return this.rows[row] && this.rows[row][column];
};

Matrix.prototype.exists = function (row, column) {
  return !!this.rows[row]
    && this.rows[row].hasOwnProperty(column);
};

Matrix.prototype.east = function (row, column) {
  return this.exists(row, column + 1)
    ? {
      value: this.value(row, column + 1),
    }
    : undefined;
};

Matrix.prototype.south = function (row, column) {
  return this.exists(row + 1, column)
    ? {
      value: this.value(row + 1, column),
    }
    : undefined;
};

Matrix.prototype.point = function (row, column) {
  return {
    value: this.value(row, column),
    east: this.east(row, column),
    south: this.south(row, column),
  };
};

export default Matrix;
