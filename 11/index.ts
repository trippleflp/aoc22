class Monkey {
  items: number[];
  operation: string;
  test: number;
  trueTarget: number;
  falseTarget: number;
  itemEncounter = 0;
  constructor(monkeyParsed: {
    items: number[];
    operation: string;
    test: number;
    throwTrue: number;
    throwFalse: number;
  }) {
    this.items = monkeyParsed.items;
    this.test = monkeyParsed.test;
    this.trueTarget = monkeyParsed.throwTrue;
    this.falseTarget = monkeyParsed.throwFalse;
    this.operation = monkeyParsed.operation;
  }

  start() {
    this.items.forEach((item) => {
      const newItemValue = Math.floor(
        eval(this.operation.replaceAll("old", item.toString())) / 3
      );
      if (newItemValue % this.test === 0) {
        monkeys[this.trueTarget].catch(newItemValue);
      } else {
        monkeys[this.falseTarget].catch(newItemValue);
      }
    });
    this.itemEncounter += this.items.length;
    this.items = [];
  }

  catch(item: number) {
    this.items.push(item);
  }
  print() {
    console.log("monkey: " + this.items.toString(), this.itemEncounter);
  }
}

const monkeys = Deno.readTextFileSync("11/input.txt.org")
  .split("\r\n\r\n")
  .map((monkeyRaw) => monkeyRaw.split("\r\n"))
  .map((monkeyLines) => ({
    items: (monkeyLines.at(1)?.replace("  Starting items: ", "") as string)
      .split(", ")
      .map((n) => parseInt(n)),
    operation: monkeyLines.at(2)?.replace("  Operation: new = ", "") as string,
    test: parseInt(
      monkeyLines.at(3)?.replace("  Test: divisible by ", "") as string
    ),
    throwTrue: parseInt(
      monkeyLines.at(4)?.replace("    If true: throw to monkey ", "") as string
    ),
    throwFalse: parseInt(
      monkeyLines.at(5)?.replace("    If false: throw to monkey ", "") as string
    ),
  }))
  .map((monkeyParsed) => new Monkey(monkeyParsed));

const rounds = 10000;

for (let i = 0; i < rounds; i++) {
  for (const monkey of monkeys) {
    monkey.start();
  }
}

console.log(monkeys.forEach((m) => m.print()));
const sorted = monkeys.map((m) => m.itemEncounter).sort((a, b) => b - a);
console.log(sorted[0] * sorted[1]);
