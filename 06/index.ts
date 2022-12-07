const data = await Deno.readTextFile("./input.txt");

function solve(data: string, i: number) {
  const count = i;
  const gen = getNextChar(data, i);

  while (true) {
    if (new Set(gen.next().value.split("")).size === count) return i;
    i++;
  }
}

function* getNextChar(line: string, start: number) {
  for (let i = start; i < line.length; i++) {
    yield line.slice(i - start, i);
  }
  return "";
}

console.log(solve(data, 4));
console.log(solve(data, 14));
