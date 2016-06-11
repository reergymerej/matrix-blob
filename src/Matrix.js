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

function Matrix(rows) {
  if (!Array.isArray(rows)) {
    err('rows should be an Array');
  } else if (!allRowsSameLength(rows)) {
    err('inequal rows');
  } else if (!allRowsValid(rows)) {
    err('invalid row');
  }
}

export default Matrix;
