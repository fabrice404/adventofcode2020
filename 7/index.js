const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split(/\n/gi);

// part 1
{
  let types = {};
  lines.forEach(line => {
    let [container, inside] = line.replace(/ bag(s|)/gi, '').split(/contain/gi).map(a => a.trim());
    inside = inside.split(/,/gi)
      .map(a => a.replace(/[^a-z ]/gi, '').trim())
      .filter(a => a !== 'no other');
    types[container] = inside;
  });

  let found = true;
  const colors = ['shiny gold'];
  while (found) {
    found = false;
    Object.entries(types)
      .forEach(([key, values]) => {
        // console.log({ key, values });
        values.forEach(value => {
          if (colors.includes(value) && !colors.includes(key)) {
            colors.push(key);
            found = true;
          }
        });
      });
  }
  // console.log(colors.length - 1);
}
// part 2
let bags = [];
lines.forEach(line => {
  let [container, inside] = line.replace(/ bag(s|)/gi, '').split(/contain/gi).map(a => a.trim());
  inside = inside.split(/,/gi)
    .map(a => a.replace(/[^a-z0-9 ]/gi, '').trim())
    .filter(a => a !== 'no other')
    .map(a => {
      let qty = parseInt(a.replace(/[^0-9]/gi, '').trim());
      let color = a.replace(/[^a-z ]/gi, '').trim();
      return { qty, color };
    });

  bags.push({ color: container, inside });
});

const countBags = (color) => {
  const bag = bags.find(bag => bag.color === color);
  console.log(bag);
  if (bag.inside.length === 0) {
    return 1;
  }
  return bag.inside.reduce((acc, val) => {
    acc += val.qty * countBags(val.color);
    return acc;
  }, 0) + 1;
};

console.log(countBags('shiny gold') - 1);