const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split(/\n/gi);

// part 1
let correct = lines.filter(line => {
  const [min, max, letter, pwd] = line
    .replace(/:/gi, '')
    .replace(/-/gi, ' ')
    .split(/ /gi);
  const l = pwd.replace(new RegExp(`[^${letter}]`, 'gi'), '').length;
  return l >= parseInt(min) && l <= parseInt(max, 10);
}).length;

console.log({ correct, lines: lines.length });

// part 2
correct = lines.filter(line => {
  const [pos1, pos2, letter, pwd] = line
    .replace(/:/gi, '')
    .replace(/-/gi, ' ')
    .split(/ /gi);

  const c1 = pwd.charAt(parseInt(pos1, 10) - 1);
  const c2 = pwd.charAt(parseInt(pos2, 10) - 1);
  return (c1 === letter || c2 == letter) && c1 !== c2;
}).length;

console.log({ correct, lines: lines.length });