const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split(/\n/gi);

// part 1
// {
//   let index = 0;
//   let indexes = [0];
//   let accumulator = 0;
//   while (true) {
//     const line = lines[index];
//     const [op, val] = line.split(' ');
//     console.log({ op, val, accumulator });

//     switch (op) {
//       case 'nop': index += 1; break
//       case 'acc': accumulator += eval(val); index += 1; break;
//       case 'jmp': index += eval(val); break;
//     }

//     if (indexes.includes(index)) {
//       break;
//     } else {
//       indexes.push(index);
//     }
//   }
//   console.log(accumulator);
// }

// part 2
const compute = (instructions) => {
  let success = true;
  let index = 0;
  let indexes = [0];
  let accumulator = 0;
  while (true && index < instructions.length) {
    const instruction = instructions[index];
    const [op, val] = instruction.split(' ');
    // console.log({ op, val, accumulator });

    switch (op) {
      case 'nop': index += 1; break
      case 'acc': accumulator += eval(val); index += 1; break;
      case 'jmp': index += eval(val); break;
    }

    if (indexes.includes(index)) {
      success = false;
      break;
    } else {
      indexes.push(index);
    }
  }
  return { success, accumulator };
}


let success = false;
let accumulator;
let i = 0;

while (!success && i < lines.length) {
  const program = JSON.parse(JSON.stringify(lines));
  console.log({ program });
  if (program[i].startsWith("nop")) {
    program[i] = program[i].replace("nop", "jmp");
  } else if (program[i].startsWith("jmp")) {
    program[i] = program[i].replace("jmp", "nop");
  }
  const result = compute(program);
  console.log({ i, result });
  success = result.success;
  accumulator = result.accumulator;
  i += 1;
}
console.log({ accumulator });