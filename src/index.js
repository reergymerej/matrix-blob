import Matrix from './Matrix';

function err(message) {
  throw new Error(message);
}

function sortAscending(a, b) {
  return a - b;
}

function findGroupContainingIndex(groups, index) {
  return groups.find(group => group.indexOf(index) > -1);
}

function addToGroup(group, index) {
  group.push(index);
  return group;
}

/**
* Adds groupA to groupB in groups, removes groupA
* @param {Array[]} groups - contains both groups, side effects!
* @param {Array[]} groupA
* @param {Array[]} groupB
* @return combined group
*/
function combineGroups(groups, groupA, groupB) {
  const groupAIndex = groups.indexOf(groupA);
  const groupBIndex = groups.indexOf(groupB);
  groupB = groupB.concat(groupA);
  groups.splice(groupAIndex, 1);
  return groups[groupBIndex] = groupB;
}

function find(rows, evaluator, returnIndices = false) {
  if (!rows) {
    err('matrix is required');
  }

  if (!evaluator) {
    err('evaluator is required');
  } else if (typeof evaluator !== 'function') {
    err('invalid evaluator');
  }

  const matrix = new Matrix(rows);

  // a group is an array of matrix point indices
  // [0, 1]
  const groups = [];

  matrix.walk(point => {
    const { value } = point;

    if (evaluator(value)) {
      let currentGroup = findGroupContainingIndex(groups, point.index);

      if (!currentGroup) {
        currentGroup = addToGroup([], point.index);
        groups.push(currentGroup);
      }

      if (point.east && evaluator(point.east.value)) {
        const eastGroup = findGroupContainingIndex(groups, point.east.index);

        if (eastGroup) {
          if (currentGroup !== eastGroup) {
            currentGroup = combineGroups(groups, currentGroup, eastGroup);
          }
        } else {
          currentGroup = addToGroup(currentGroup, point.east.index);
        }
      }

      if (point.south && evaluator(point.south.value)) {
        currentGroup = addToGroup(currentGroup, point.south.index);
      }
    }
  });

  // convert each group from an Array of indices to an Array of [row, col].
  return groups
    .map(group => {
      const sorted = group.sort(sortAscending);
      return returnIndices
        ? sorted
        : sorted.map(index => matrix.getCoordsFromIndex(index));
    });
}

export default {
  find,
};
