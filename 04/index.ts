const data = await Deno.readTextFile("./input.txt")
  .then((txt) => txt.split("\r\n"))
  .then(
    (lines) => lines.map((line) => line.split(",")) as Array<[string, string]>
  );

function parseNum(range: string): [number, number] {
  return range.split("-").map((n) => parseInt(n)) as [number, number];
}

function first(data: Array<[string, string]>) {
  return data.filter((entry) => {
    const [fLow, fHigh] = parseNum(entry[0]);
    const [sLow, sHigh] = parseNum(entry[1]);

    return (fLow <= sLow && fHigh >= sHigh) || (fLow >= sLow && fHigh <= sHigh);
  }).length;
}

function second(data: Array<[string, string]>) {
  return data.filter((entry) => {
    const [fLow, fHigh] = parseNum(entry[0]);
    const [sLow, sHigh] = parseNum(entry[1]);
    return (
      (sLow >= fLow && sLow <= fHigh) ||
      (sHigh >= fLow && sHigh <= fHigh) ||
      (fLow <= sLow && fHigh >= sHigh) ||
      (fLow >= sLow && fHigh <= sHigh)
    );
  }).length;
}

console.log(first(data));
console.log(second(data));
