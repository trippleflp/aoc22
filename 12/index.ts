let start: Point = { x: 0, y: 0 };
let end: Point = { x: 0, y: 0 };
const grid = new Map<string, Node>();

const data = Deno.readTextFileSync("12/input.txt.org")
  .split("\r\n")
  .map((line, y) =>
    line
      .split("")
      .map((c, x) => {
        if (c === "S") {
          start = { x, y };
          c = "a";
        } else if (c === "E") {
          end = { x, y };
          c = "z";
        }
        return c.charCodeAt(0) % 97;
      })
      .forEach((lev, x) =>
        grid.set(toKey(x, y), { height: lev, x, y, neighbourKeys: [] })
      )
  );
function toKey(x: number, y: number) {
  return `${x}-${y}`;
}
type Point = {
  x: number;
  y: number;
};

type Node = Point & {
  height: number;
  h?: number;
  neighbourKeys: Array<[string, number]>;
};

// h(n) = h'(n, w1) + distance(w1, w2) + h'(w2, goal)
const D = 1;
function heuristic(node: Point, goal: Point) {
  const dx = Math.abs(node.x - goal.x);
  const dy = Math.abs(node.y - goal.y);
  return D * (dx + dy);
}
const optimalDistance: number = heuristic(start, end);

[...grid.entries()].map(([key, val]) => {
  const left = toKey(val.x - 1, val.y);
  const right = toKey(val.x + 1, val.y);
  const top = toKey(val.x, val.y + 1);
  const down = toKey(val.x, val.y - 1);
  const isWalkable = (node: Node, keys: Array<string>) =>
    keys.map((key) =>
      grid.has(key) &&
      Math.abs((grid.get(key) as Node).height - node.height) < 2
        ? key
        : undefined
    );
  val.neighbourKeys.push(
    ...(
      isWalkable(val, [left, right, top, down]).filter(
        (v) => !!v
      ) as Array<string>
    ).map(
      (key) =>
        [
          key,
          heuristic(start, val) + 1 + heuristic(grid.get(key) as Node, end),
        ] as [string, number]
    )
  );
});

// distance f(n) = g(n) + h(n)
function Search(start: Point, end: Point, map: Map<string, Node>) {
  const openList = [];
  const D = 1;
}
