Object.defineProperty(Array.prototype, "chunk", {
  value: function (chunkSize: number) {
    const R = [];
    for (let i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  },
});

const data = Deno.readTextFileSync("10/input.txt")
  .split("\n")
  .map((line) => line.split(" "));

let X = 1;
let onetick: [string, string] | undefined;
let tickCount = 1;
const cycleMap = new Map<number, number>();
cycleMap.set(tickCount, X);

for (const cmd of data) {
  X += onetick ? parseInt(onetick[1]) : 0;
  if (onetick) {
    onetick = undefined;
    tickCount++;
    cycleMap.set(tickCount, X);
  }
  tickCount++;
  cycleMap.set(tickCount, X);
  if (cmd.length === 2) {
    onetick = cmd as [string, string];
  }
}

X += onetick ? parseInt(onetick[1]) : 0;
tickCount++;
cycleMap.set(tickCount, X);

const res = [20, 60, 100, 140, 180, 220]
  .map((tick) => (cycleMap.get(tick) as number) * tick)
  .reduce((a, b) => a + b);

const chunks: Array<Array<[number, number]>> = [...cycleMap.entries()].chunk(
  40
);

const pic: Array<Array<string>> = chunks.map((line) =>
  line.map(([i, num]) => (Math.abs(num - ((i - 1) % 40)) > 1 ? "." : "#"))
);

console.log(res);

pic.forEach((line) => console.log(line.reduce((a, b) => a.concat(b))));
