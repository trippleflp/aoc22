let start: Point = { x: 0, y: 0, height: 0 };
let end: Point = { x: 0, y: 0, height: 0 };
const grid = new Map<string, Node>();

Deno.readTextFileSync("12/input.txt")
  .split("\r\n")
  .map((line, y) =>
    line
      .split("")
      .map((c, x) => {
        if (c === "S") {
          start = { x, y, height: 0 };
          c = "a";
        } else if (c === "E") {
          end = { x, y, height: 25 };
          c = "z";
        }
        return c.charCodeAt(0) % 97;
      })
      .forEach((lev, x) => {
        grid.set(toKey(x, y), {
          height: lev,
          x,
          y,
          neighbours: [],
          path: [],
          h: Number.MAX_SAFE_INTEGER,
          g: Number.MAX_SAFE_INTEGER,
        });
      })
  );

function toKey(x: number, y: number): string;
function toKey(p: Point): string;
function toKey(a: any, b?: any) {
  if (typeof b === "number") {
    return `${a}-${b}`;
  }
  return `${a.x}-${a.y}`;
}
type Point = {
  x: number;
  y: number;
  height: number;
};

type Node = Point & {
  h: number;
  g: number;
  neighbours: Array<Node>;
  path: Array<Node>;
};

const D = 1;
function heuristic(node: Point, goal: Point) {
  const dx = Math.abs(node.x - goal.x);
  const dy = Math.abs(node.y - goal.y);
  const dz = Math.abs(node.height - goal.height);
  return D * (dx + dy + dz * 2);
}

[...grid.entries()].map(([key, val]) => {
  const left = toKey(val.x - 1, val.y);
  const right = toKey(val.x + 1, val.y);
  const top = toKey(val.x, val.y + 1);
  const down = toKey(val.x, val.y - 1);
  const isWalkable = (node: Node, keys: Array<string>) =>
    keys.map((key) =>
      grid.has(key) && (grid.get(key) as Node).height - node.height <= 1
        ? key
        : undefined
    );
  val.neighbours.push(
    ...(
      isWalkable(val, [left, right, top, down]).filter(
        (v) => !!v
      ) as Array<string>
    ).map((key) => {
      const n = grid.get(key) as Node;
      n.h = heuristic(n, end);
      return n;
    })
  );
});

class PriorityOrder {
  list: Array<Node> = [];
  constructor() {}
  get() {
    return this.list.shift();
  }
  put(node: Node) {
    if (this.list.find((n) => node === n)) return;
    const prio = node.g + node.h;
    const putIndex = this.list.findIndex((n) => n.h + n.g > prio);
    if (putIndex === -1) {
      this.list.push(node);
    } else {
      const removedNodes = this.list.splice(putIndex);
      this.list.push(node, ...removedNodes);
    }
  }
}

function anUglyStar(start: Point, grid: Map<string, Node>) {
  grid.get(toKey(start))!.g = 0;
  const closedList = new Set<string>();
  const order = new PriorityOrder();
  let endNode;
  order.put(grid.get(toKey(start)) as Node);
  while (true) {
    const node = order.get();
    if (!node) break;
    if (node.x === end.x && node.y === end.y) {
      endNode = node;
      break;
    }
    node.neighbours.forEach((n) => {
      const checkG = node.g + 1;
      if (n.g > checkG) {
        n.g = checkG;
        n.path = [...node.path, node];
      }
      if (!closedList.has(toKey(n))) order.put(n);
    });
    closedList.add(toKey(node));
  }

  return endNode;
}

function cleanGrid() {
  [...grid.entries()].forEach(([key, node]) =>
    grid.set(key, { ...node, g: Number.MAX_SAFE_INTEGER, path: [] })
  );
  return grid;
}

console.log(anUglyStar(start, grid)?.path.length);

console.log(
  [...grid.values()]
    .filter((n) => n.height === 0)
    .map((n) => anUglyStar(n, cleanGrid())?.path.length)
    .map((l) => (l ? l : Number.MAX_SAFE_INTEGER))
    .sort((a, b) => a - b)[0]
);

console.log();
