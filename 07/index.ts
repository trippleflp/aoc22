const data = Deno.readTextFileSync("07/input.txt").split("\n").reverse();

type Node = {
  name: string;
  children: Array<Node>;
  size?: number;
  parent?: Node;
  type: "file" | "dir";
};

const godNode: Node = { type: "dir", name: "/", children: [] };
let currentNode: Node | undefined = godNode;
data.pop();

while (true) {
  // console.log(currentNode.name, currentNode.children);

  const line = data.pop();
  if (!line) break;
  if (line.startsWith("$ cd")) executeCd(line.slice(5));
  else executeLs();
}

function executeCd(location: string) {
  // console.log("cd ", location);
  if (location.trim() === "..") return (currentNode = currentNode?.parent);
  if (location.trim() === "/") return (currentNode = godNode);
  const existNode = exists(currentNode?.children, location, "dir");
  if (existNode) return (currentNode = existNode);
  const newCurNode: Node = {
    name: location,
    parent: currentNode,
    type: "dir",
    children: [],
  };
  currentNode?.children?.push(newCurNode);
  currentNode = newCurNode;
}

function executeLs() {
  while (true) {
    const line = data.pop();
    if (!line) return;
    if (line.startsWith("$")) return data.push(line);
    // console.log("ls data ", line);
    if (line.startsWith("dir")) {
      const existNode = exists(currentNode?.children, line.slice(4), "dir");
      if (existNode) continue;
      const newNode: Node = {
        name: line.slice(4),
        parent: currentNode,
        type: "dir",
        children: [],
      };
      currentNode?.children?.push(newNode);
    } else {
      const existNode = exists(
        currentNode?.children,
        line.split(" ")[1],
        "file"
      );
      if (existNode) continue;
      const newNode: Node = {
        name: line.split(" ")[1],
        parent: currentNode,
        type: "file",
        size: parseInt(line.split(" ")[0]),
        children: [],
      };
      currentNode?.children?.push(newNode);
    }
  }
}

function exists(
  collection: Array<Node> | undefined,
  name: string,
  type: "dir" | "file"
) {
  if (!collection) return undefined;
  return collection.find((n) => n.type === type && n.name === name);
}

let sol = 0;

function calcSize(node: Node) {
  node.children = node.children.map((n) => {
    if (n.type === "file") return n;
    n.size === calcSize(n);
    console.log(n.size && n.size <= 10000, n.size);

    if (n.size && n.size <= 100000) sol += n.size;
    return n;
  });

  node.size = node.children
    .map((n) => (n.size ? n.size : 0))
    .reduce((a, b) => a + b);
  return node.size;
}

let smallest = Number.MAX_VALUE;
function find(node: Node, border: number) {
  if (node.size && node.size < smallest && node.size >= border) {
    smallest = node.size;
  }
  node.children.forEach((n) => (n.type === "dir" ? find(n, border) : null));
}

const usedSpace = calcSize(godNode);
const freeSpace = 70000000 - usedSpace;
find(godNode, 30000000 - freeSpace);

console.log(sol);
console.log(smallest);
