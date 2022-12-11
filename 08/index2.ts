type Tree = {
  size: number;
  score: number;
};

type Point = {
  x: number;
  y: number;
};

const data = Deno.readTextFileSync("08/input.txt")
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split("")
      .map((tree) => ({ size: parseInt(tree), score: 0 }))
  );

const bright = data[0].length;
const length = data.length;

for (let y = 1; y < data.length - 1; y++) {
  for (let x = 1; x < data[y].length - 1; x++) {
    const tree = data[y][x];
    tree.score = checkScore(tree, { x: x, y: y });
  }
}

function checkScore(tree: Tree, p: Point) {
  let score = 1;
  let i = 0;
  for (let x = p.x - 1; x >= 0; x--) {
    if (data[p.y][x].size >= tree.size) {
      i++;
      break;
    }
    i++;
  }
  score *= i;
  i = 0;
  for (let x = p.x + 1; x < bright; x++) {
    if (data[p.y][x].size >= tree.size) {
      i++;
      break;
    }
    i++;
  }
  score *= i;
  i = 0;
  for (let y = p.y - 1; y >= 0; y--) {
    if (data[y][p.x].size >= tree.size) {
      i++;
      break;
    }
    i++;
  }
  score *= i;
  i = 0;
  for (let y = p.y + 1; y < length; y++) {
    if (data[y][p.x].size >= tree.size) {
      i++;
      break;
    }
    i++;
  }
  score *= i;
  return score;
}
console.log(data);

console.log(
  data
    .flatMap((row) => row.map((tree) => tree.score))
    .sort((a, b) => b - a)
    .at(0)
);
const score = data
  .flatMap((row) => row.map((tree) => tree.score))
  .sort((a, b) => b - a);
console.log(score);
