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
      return;
    } else {

      // Find group that this guy is already in.
      currentGroup = groups.find(group => group.indexOf(point.index) > -1);

      if (!currentGroup) {
        currentGroup = [i];
        groups.push(currentGroup);
      }

      // console.log('currentGroup', currentGroup);

      if (point.east && evaluator(point.east.value)) {
        // TODO: join multiple groups
        let eastGroup = groups.find(group =>
          group.indexOf(point.east.index) > -1);

        if (eastGroup) {
          // console.log('merge groups', point.east.index, currentGroup, eastGroup);

          // combine currentGroup with eastGroup
          const eastGroupIndex = groups.indexOf(eastGroup);
          const currentGroupIndex = groups.indexOf(currentGroup);
          eastGroup = eastGroup.concat(currentGroup);
          groups.splice(currentGroupIndex, 1);
          currentGroup = groups[eastGroupIndex] = eastGroup;
        } else {
          currentGroup.push(point.east.index);
        }
      }

      if (point.south && evaluator(point.south.value)) {
        currentGroup.push(point.south.index);
      }
    }
  });

  // convert each group from an Array of indices to an Array of [row, col].
  return groups
    .map(group => {
      return group.sort((a, b) => {
        return a - b;
      })
      .map(index => matrix.getCoordsFromIndex(index));
    });
}

export default {
  find,
};
