const [cratesText, actiontext] = await Deno.readTextFile("./input.txt").then(
  (t) => t.split("\r\n\r\n")
);

type Action = {
  num: number;
  from: number;
  to: number;
};

class Stack {
  private crates: Array<string> = [];
  constructor(data: Array<string>) {
    this.add(
      data
        .filter((c) => c !== " ")
        .slice(0, -1)
        .reverse()
    );
  }

  public getTop() {
    return this.crates.pop();
  }

  public remove(num: number, i: number) {
    if (num > this.crates.length) {
      console.log(num, this.crates.length, "actions: ", i);
    }

    const removedCrates = this.crates.slice(-num).reverse();
    if (
      removedCrates.length + this.crates.slice(0, -num).length !==
      this.crates.length
    ) {
      console.log("LMAO");
    }
    // console.log(this.crates, this.crates.slice(0, -num), removedCrates);
    this.crates = this.crates.slice(0, -num);

    return removedCrates;
  }

  public add(crates: Array<string>) {
    this.crates.push(...crates);
  }
}
function splitStacks(cratesText: string) {
  const lines = cratesText.split("\n");
  const numOfStacks = lines[0].length / 4;
  const stackStrings: Array<string[]> = Array.from(
    { length: numOfStacks },
    () => []
  );

  for (const line of lines) {
    for (let [i, y] = [0, 0]; i < line.length; [i, y] = [i + 4, y + 1]) {
      const c = line.charAt(i + 1);
      stackStrings[y].push(c);
    }
  }
  return stackStrings.map((stackStr) => new Stack(stackStr));
}

function parseActions() {
  const actions: Array<Action> = [];
  for (const actionLine of actiontext.split("\n")) {
    actions.push({
      num: parseInt(actionLine.split("move ")[1].split(" ")[0]),
      from: parseInt(actionLine.split("from ")[1].split(" ")[0]),
      to: parseInt(actionLine.split("to ")[1].split("")[0]),
    });
  }
  return actions;
}

const stacks = splitStacks(cratesText);
const actions = parseActions();

console.log(stacks);
console.log(actions.filter((a) => a.num > 10));

for (const [i, action] of actions.entries()) {
  const crates = stacks[action.from - 1].remove(action.num, i);
  stacks[action.to - 1].add(crates);
}

// console.log(stacks);

console.log(stacks.map((s) => s.getTop()).reduce((a, b) => a + b));
