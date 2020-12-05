const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const findRow = (letter, min, max) => {
  const divide = (max - min + 1) / 2;
  if (letter === 'F') {
    max -= divide;
  } else if (letter = 'B') {
    min += divide;
  }
  return { min, max };
};

const findCol = (letter, min, max) => {
  const divide = (max - min + 1) / 2;
  if (letter === 'L') {
    max -= divide;
  } else if (letter = 'R') {
    min += divide;
  }
  return { min, max };
}

let maxSeat = 0;
let allSeats = [];
input.split(/\n/gi).forEach((seat) => {
  const row = seat.substring(0, 7).split('');
  const col = seat.substr(7).split('');

  let min = 0;
  let max = 127;
  for (let i = 0; i < row.length; i += 1) {
    const r = findRow(row[i], min, max);
    min = r.min;
    max = r.max;
  }
  const r = min;

  min = 0;
  max = 7;
  for (let i = 0; i < col.length; i += 1) {
    const r = findCol(col[i], min, max);
    min = r.min;
    max = r.max;
  }
  const c = min;
  const s = r * 8 + c;
  allSeats.push(s);
  if (s > maxSeat) {
    maxSeat = s;
  }
});
console.log(maxSeat);

const missingSeats = [];
for (let i = 0; i < maxSeat; i += 1) {
  if (!allSeats.includes(i)) {
    missingSeats.push(i);
  }
}
console.log(missingSeats.sort((a, b) => a > b ? 1 : -1));