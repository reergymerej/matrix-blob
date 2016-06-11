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

  const groups = [
    // a group is an array of matrix point indices
    // [0, 1]
  ];
  let currentGroup;

  // walk each row, left to right
  matrix.walk((point, i) => {
    const { value } = point;
    console.log(i, point);

    // Is this of interest?
    if (!evaluator(value)) {
      // no - next
      return;
    } else {
      // yes -

      // Add it to a group.
      if (!currentGroup) {
        currentGroup = [];
        groups.push(currentGroup);
      }
      currentGroup.push(i);

      // east
      // is this one we're interested in?



      //
    }
  });

  // convert each group from an Array of indices to an Array of [row, col].
  return groups.map(group => {
    return group.map(index => {
      matrix.getCoordsFromIndex(index);
    })
  });
}

export default {
  find,
};
