import Matrix from './Matrix';

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

function find(rows, evaluator) {
  if (!rows) {
    err('matrix is required');
  }

  if (!evaluator) {
    err('evaluator is required');
  } else if (typeof evaluator !== 'function') {
    err('invalid evaluator');
  }

  const matrix = new Matrix(rows);
  return [];
}

export default {
  isValidMatrix,
  find,
};
