class Monkey {
  items: bigInt[];
  operation: string;
  test: bigint;
  trueTarget: number;
  falseTarget: number;
  itemEncounter = BigInt(0);
  constructor(monkeyParsed: {
    items: number[];
    operation: string;
    test: number;
    throwTrue: number;
    throwFalse: number;
  }) {
    this.items = monkeyParsed.items.map(BigInt);

    this.test = BigInt(monkeyParsed.test);
    this.trueTarget = monkeyParsed.throwTrue;
    this.falseTarget = monkeyParsed.throwFalse;
    this.operation = monkeyParsed.operation;
  }

  start() {
    this.items.forEach((item) => {
      const summandStr = this.operation.split(" ")[1];
      const summand = summandStr === "old" ? item : BigInt(summandStr);
      const newItemValue =
        this.operation.split(" ")[0] === "*" ? item * summand : item + summand;

      // const newItemValue = BigInt(
      //   eval(this.operation.replaceAll("old", item.toString()))
      // );
      if (newItemValue % (this.test * this.test) === BigInt(0)) {
        monkeys[this.trueTarget].catch(newItemValue);
      } else {
        monkeys[this.falseTarget].catch(newItemValue);
      }
    });
    this.itemEncounter += BigInt(this.items.length);
    this.items = [];
  }

  catch(item: bigint) {
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
    operation: monkeyLines
      .at(2)
      ?.replace("  Operation: new = old ", "") as string,
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
    if (i % 100 === 0) {
      console.log("round " + i);
    }
  }
}

console.log(monkeys.forEach((m) => m.print()));
const sorted = monkeys
  .map((m) => m.itemEncounter)
  .sort((a, b) => (b > a ? -1 : 1));
console.log(sorted[0] * sorted[1]);
