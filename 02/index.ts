const text = await Deno.readTextFile("./input.txt");

const evalRound = (r: [string, string]) => {
  let count = 0;
  let we = "";
  const opp = r[0];

  switch (r[1]) {
    case "X":
      count = 1;
      we = "A";
      break;
    case "Y":
      count = 2;
      we = "B";
      break;
    case "Z":
      count = 3;
      we = "C";
      break;
  }

  if (we === opp) {
    count += 3;
  }
  if (we === "A" && opp == "C") {
    count += 6;
  }
  if (we === "B" && opp == "A") {
    count += 6;
  }
  if (we === "C" && opp == "B") {
    count += 6;
  }

  return count;
};

const evalRoundTwo = (r: [string, string]) => {
  let count = 0;
  const exp = r[1];
  const opp = r[0];

  switch (exp) {
    case "X":
      count = 0;
      break;
    case "Y":
      count = 3;
      break;
    case "Z":
      count = 6;
      break;
  }

  let a = 0;
  switch (opp) {
    case "A":
      a = 1;
      break;
    case "B":
      a = 2;
      break;
    case "C":
      a = 3;
      break;
  }

  if (exp === "X") {
    a--;
    a = a === 0 ? 3 : a;
  }
  if (exp === "Z") {
    a++;
    a = a % 4 === 0 ? 1 : a;
  }
  count += a;

  return count;
};

const res = text
  .split("\r\n")
  .map((r) => r.split(" ") as [string, string])
  .map((r) => evalRound(r))
  .reduce((a, b) => a + b);
console.log(res);

const res2 = text
  .split("\r\n")
  .map((r) => r.split(" ") as [string, string])
  .map((r) => evalRoundTwo(r))
  .reduce((a, b) => a + b);
console.log(res2);
