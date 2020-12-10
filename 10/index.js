const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');
const lines = input.split(/\n/gi);

// part 1
const sorted = lines.map(a => parseInt(a, 10)).sort((a, b) => a > b ? 1 : -1);
const diff = {
  1: 0,
  2: 0,
  3: 0,
};
const tree = {};
console.log(sorted);
let val = 0;
for (let i = 0; i < sorted.length; i += 1) {
  const d = sorted[i] - (sorted[i - 1] || 0);
  diff[d] += 1;
  val = parseInt(sorted[i] || 0);
  tree[val] = sorted.filter(a => a <= val + 3 && a > val);
}
diff[3] += 1;
tree[0] = sorted.filter(a => a <= 3 && a > 0);
tree[val].push(val + 3);
console.log({ diff });

// part 2
const cache = {};

const cumulSum = (n) => {
  if (cache[n]) {
    return cache[n];
  }
  if (tree[n] == null) {
    return 1;
  }
  const result = tree[n].reduce((acc, val) => {
    const res = acc + cumulSum(val);
    // console.log({ acc, val, res, cumul: cumulSum(val) });
    return res;
  }, 0);
  cache[n] = result;
  // console.log({ n, result });
  return result;
};

const res = cumulSum(0);
console.log({ tree, cache, res });
