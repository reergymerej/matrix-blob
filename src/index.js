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

    // Is this of interest?
    if (!evaluator(value)) {
      // no - next
      return;
    } else {
      // yes -

      // Find group that this guy is already in.
      currentGroup = groups.find(group => group.indexOf(point.index) > -1);

      if (!currentGroup) {
        currentGroup = [i];
        groups.push(currentGroup);
        // TODO: join multiple groups
      }

      if (point.east && evaluator(point.east.value)) {
        // console.log('The east is good too!');
        currentGroup.push(point.east.index);
      }

      if (point.south && evaluator(point.south.value)) {
        // console.log('The south is good too!');
        currentGroup.push(point.south.index);
      }
    }
  });


  // console.log(matrix.print());

  // convert each group from an Array of indices to an Array of [row, col].
  return groups.map(group => {
    return group.map(index => matrix.getCoordsFromIndex(index));
  });
}

export default {
  find,
};
