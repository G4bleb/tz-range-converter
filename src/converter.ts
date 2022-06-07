import { convert } from "./lib";

if (process.argv.length !== 4) {
  console.error("Error : wrong number of arguments");
  process.exit(1);
}

const [range, tz] = process.argv.splice(2);
console.log(convert(range, tz));
