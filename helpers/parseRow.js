const parseRow = (row) => {
  let cursor = 0;
  let output = [];
  let fieldStopOperatorRequired = false;
  let fieldStartOperators = ["[", '"'];
  let fieldStopOperators = ["]", '"'];

  while (cursor < row.length) {
    let nextSeparator = row.indexOf(" ", cursor);
    if (nextSeparator == -1) {
      nextSeparator = row.length;
    }

    if (fieldStartOperators.includes(row[cursor])) {
      // this is the start of a field.
      let fieldOperatorIndex = fieldStartOperators.indexOf(row[cursor]);
      fieldStopOperatorRequired = fieldStopOperators[fieldOperatorIndex];
    }

    let buffer;
    let bufferStart;
    let advanceLength;
    let bufferLength;
    if (fieldStopOperatorRequired) {
      // we are inside a [***] or "***" field. We need to move cursor forward until we consume the corresponding fieldStopOperator.
      let fieldStopOperatorPosition = row.indexOf(
        fieldStopOperatorRequired,
        cursor + 1 /* Opening operator cannot close the field. */
      );

      if (fieldStopOperatorPosition == -1) {
        // Unterminated string.
        fieldStopOperatorPosition = row.length + 1;
      }

      bufferStart = cursor + 1; // chop opening operator [
      advanceLength = fieldStopOperatorPosition - cursor;
      bufferLength = advanceLength - 1; // chop closing operator ]
      fieldStopOperatorRequired = false;
    } else {
      bufferStart = cursor;
      advanceLength = nextSeparator - cursor;
      bufferLength = advanceLength;
    }
    buffer = row.substr(bufferStart, bufferLength);

    output.push(buffer);
    cursor = bufferStart + advanceLength + 1;
  }

  return output;
};

module.exports = parseRow;
