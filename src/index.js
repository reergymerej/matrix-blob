import Matrix from './Matrix';

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
  find,
};
