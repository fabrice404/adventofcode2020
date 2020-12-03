const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');



const highlight = (text, index) => {
  return text.slice(0, index) + '\x1b[41m' + text.slice(index, index + 1) + '\x1b[0m' + text.slice(index + 1);
}

const day3 = (right, down) => {
  const lines = input.split(/\n/gi);
  let trees = 0;
  for (let x = 1, y = 1; x < lines.length + 1; x += down, y += right) {
    const lineIndex = x - 1;
    const colIndex = y - 1;
    let line = ''

    while (line.length / down < lines.length * right) {
      line += lines[lineIndex];
    }

    if (colIndex <= line.length) {
      // console.log(highlight(line, colIndex), x, y, lineIndex, colIndex, line.charAt(colIndex));
    }

    if (line.charAt(colIndex) === '#') {
      trees += 1;
    }
  }
  return trees
};

// part 1 
console.log(day3(3, 1));

// part 2
console.log(
  day3(1, 1),
  day3(3, 1),
  day3(5, 1),
  day3(7, 1),
  day3(1, 2)
);
console.log(
  day3(1, 1) *
  day3(3, 1) *
  day3(5, 1) *
  day3(7, 1) *
  day3(1, 2)
);