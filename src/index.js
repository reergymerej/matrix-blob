function allRowsValid(matrix) {
  // Is each row an Array?
  return matrix.find(row => !Array.isArray(row)) === undefined;
}

function allRowsSameLength(matrix) {
  let length;
  return !matrix.some(row => {
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
function isValidMatrix(matrix) {
  return Array.isArray(matrix)
    && allRowsValid(matrix)
    && allRowsSameLength(matrix);
}

function err(message) {
  throw new Error(message);
}

function find(matrix, evaluator) {
  if (!matrix) {
    err('matrix is required');
  } else if (!isValidMatrix(matrix)) {
    err('invalid matrix');
  }

  if (!evaluator) {
    err('evaluator is required');
  } else if (typeof evaluator !== 'function') {
    err('invalid evaluator');
  }

  return [];
}

export default {
  isValidMatrix,
  find,
};
