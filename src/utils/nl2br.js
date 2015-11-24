import React from 'react';

const newLineRegex = /(\r\n|\n\r|\r|\n)/g;
export default function nl2br(str) {
  return str.split(newLineRegex).map(line =>
    line.match(newLineRegex) ? <br /> : line
  );
}
