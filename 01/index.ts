const text = await Deno.readTextFile("./input.txt");
const sorted = text
  .split("\r\n\r\n")
  .map((text) =>
    text
      .split("\r\n")
      .map((v) => parseInt(v))
      .reduce((a, b) => a + b)
  )
  .sort((a, b) => b - a);

console.log("MAX THREE: ", sorted[0] + sorted[1] + sorted[2]);
