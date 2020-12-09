const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split(/\n/gi);

const LEN = 25;

const findSum = (index) => {
  for (let i = index - LEN; i < index; i += 1) {
    for (let j = index - LEN; j < index; j += 1) {
      if (i !== j && parseInt(lines[i], 10) + parseInt(lines[j], 10) === parseInt(lines[index], 10)) {
        return true;
      }
    }
  }
  return false;
}

let iMax;
let result;
for (let i = LEN; i < lines.length; i += 1) {
  if (!findSum(i, lines[i])) {
    iMax = i;
    result = parseInt(lines[i]);
    break;
  }
}
console.log({ iMax, result });


for (let i = 0; i < iMax; i += 1) {
  let sum = 0;
  let vals = [];
  for (let j = i; j < iMax; j += 1) {
    const val = parseInt(lines[j]);
    sum += val;
    vals.push(val);
    if (sum === result) {
      console.log({
        min: Math.min(...vals),
        max: Math.max(...vals),
        total: Math.min(...vals) + Math.max(...vals),
      })
    }
  }
}