const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split(/\n/gi);

// part 1
{
  const groups = [];
  let group = new Set();

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line === '') {
      groups.push([...group])
      group = new Set();
    } else {
      line.split('').forEach(letter => {
        group.add(letter);
      });
    }
  }
  if (group.size > 0) {
    groups.push([...group])
  }

  // console.log(groups);
  console.log(groups.flat().length);
}

// part 2
{
  const groups = [];
  let group = new Set();
  let newgroup = true;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line === '') {
      groups.push([...group])
      group = new Set();
      newgroup = true;
    } else {
      if (newgroup) {
        line.split('').forEach(letter => {
          group.add(letter);
        });
      } else {
        group.forEach(letter => {
          if (!line.split('').includes(letter)) {
            group.delete(letter);
          }
        })
      }
      newgroup = false;
    }
  }
  if (group.size > 0) {
    groups.push([...group])
  }

  console.log(groups);
  console.log(groups.flat().length);
}