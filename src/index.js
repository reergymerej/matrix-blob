function isValidMatrix(matrix) {
  return Array.isArray(matrix);
}

function err(message) {
  throw new Error(message);
}

function find(matrix, comparator) {
  if (!matrix) {
    err('matrix is required');
  } else if (!isValidMatrix(matrix)) {
    err('invalid matrix');
  }

  if (!comparator) {
    err('comparator is required');
  } else if (typeof comparator !== 'function') {
    err('invalid comparator');
  }

  return [];
}

export default {
  find,
};
