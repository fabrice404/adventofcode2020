const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');
const numbers = input.split(/\n/gi).map(n => parseInt(n.trim(), 10));

// part 1
for (let i = 0; i < numbers.length; i += 1) {
  for (let j = 0; j < numbers.length; j += 1) {
    const a = numbers[i];
    const b = numbers[j];
    if (i !== j && a + b === 2020) {
      console.log({ a, b, sum: a + b, multiple: a * b });
    }
  }
}

// part 2
for (let i = 0; i < numbers.length; i += 1) {
  for (let j = 0; j < numbers.length; j += 1) {
    for (let k = 0; k < numbers.length; k += 1) {
      const a = numbers[i];
      const b = numbers[j];
      const c = numbers[k];
      if (i !== j
        && i !== k
        && j !== k
        && a + b + c === 2020
      ) {
        console.log({ a, b, c, sum: a + b + c, multiple: a * b * c });
      }
    }
  }
}