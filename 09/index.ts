const data = Deno.readTextFileSync("09/input.txt")
  .split("\n")
  .map((line) => line.split(" "));

class Thing {
  x: number;
  y: number;
  positions: Set<string>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.positions = new Set();
    this.positions.add("" + x + y);
  }

  moveTowards(point: Thing) {
    const difX = point.x - this.x;
    const difY = point.y - this.y;

    let difXNorm = Math.abs(difX) > 1 ? Math.sign(difX) : 0;
    let difYNorm = Math.abs(difY) > 1 ? Math.sign(difY) : 0;
    if (Math.abs(difXNorm) == 1 && difY !== 0) {
      difYNorm = difY < 0 ? -1 : 1;
    } else if (Math.abs(difYNorm) == 1 && difX !== 0) {
      difXNorm = difX < 0 ? -1 : 1;
    }

    this.move(difXNorm, difYNorm);
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
    this.positions.add("" + this.x + this.y);
  }
}

const head = new Thing(1000, 1000);
const tailies = [...Array(9).keys()].map(() => new Thing(1000, 1000));
console.log(tailies);

data.forEach(([dir, num]) => {
  for (const _ of Array(parseInt(num)).keys()) {
    switch (dir) {
      case "U":
        head.move(0, 1);
        break;
      case "D":
        head.move(0, -1);
        break;
      case "R":
        head.move(1, 0);
        break;
      case "L":
        head.move(-1, 0);
        break;
    }
    tailies.forEach((tail, i) => {
      if (i === 0) {
        tail.moveTowards(head);
      } else {
        tail.moveTowards(tailies[i - 1]);
      }
    });
  }
});

// console.log(tail.positions, head.positions);

console.log(tailies[8].positions.size);
