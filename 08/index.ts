type Tree = {
  size: number;
  visible: boolean;
};

type Point = {
  x: number;
  y: number;
};

const data = Deno.readTextFileSync("08/input.txt.org")
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split("")
      .map((tree) => ({ size: parseInt(tree), visible: false }))
  );

const bright = data[0].length;
const length = data.length;

data[0] = data[0].map((tree) => ({ size: tree.size, visible: true }));
data[length - 1] = data[length - 1].map((tree) => ({
  size: tree.size,
  visible: true,
}));
for (let y = 0; y < data.length - 1; y++) {
  data[y][0].visible = true;
  data[y][bright - 1].visible = true;
}

for (let y = 1; y < data.length - 1; y++) {
  for (let x = 1; x < data[y].length - 1; x++) {
    const tree = data[y][x];
    tree.visible = checkVisibility(tree, { x: x, y: y });
  }
}

function checkVisibility(tree: Tree, p: Point) {
  let visible = true;
  for (let x = 0; x < p.x; x++) {
    if (data[p.y][x].size >= tree.size) {
      visible = false;
      break;
    }
  }
  if (visible) return visible;
  visible = true;
  for (let x = p.x + 1; x < bright; x++) {
    if (data[p.y][x].size >= tree.size) {
      visible = false;
      break;
    }
  }
  if (visible) return visible;
  visible = true;

  for (let y = 0; y < p.y; y++) {
    if (data[y][p.x].size >= tree.size) {
      visible = false;
      break;
    }
  }
  if (visible) return visible;
  visible = true;

  for (let y = p.y + 1; y < length; y++) {
    if (data[y][p.x].size >= tree.size) {
      visible = false;
      break;
    }
  }
  return visible;
}
console.log(data);

console.log(
  data
    .flatMap((row) => row.map((tree) => tree.visible))
    .filter((visible) => visible).length
);
