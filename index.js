"use strict";

function parse(prop) {
  let rawPieces = prop.split('.');
  let pieces = [];
  const pattern = new RegExp(/(.+)\[(\d+)\]$/);
  rawPieces.forEach(function(piece) {
    let thisPiece = piece;
    if (pattern.test(piece)) {
      let matches = pattern.exec(piece);
      thisPiece = {name: matches[1], index: parseInt(matches[2])}
    }
    pieces.push(thisPiece);
  });
  return pieces;
}

function get(obj, prop, defaultValue) {
  if (!prop) {
    return obj;
  }

  let current = obj;
  let pieces = parse(prop);
  let breakAfter = 100;
  let count = 0;
  while (pieces.length > 0) {
    let piece = pieces.shift();
    let pieceType = typeof piece;
    if (pieceType == 'object' && piece.hasOwnProperty('name') && piece.hasOwnProperty('index')) {
      if (current.hasOwnProperty(piece.name) && current[piece.name] && piece.index < current[piece.name].length) {
        current = current[piece.name][piece.index];
        continue;
      }

      return defaultValue;
    }

    if (typeof current == 'object' && (!current || !current.hasOwnProperty(piece))) {
      return defaultValue;
    }

    current = current[piece];

  }

  return current;
}
module.exports = { get: get, parse: parse };
