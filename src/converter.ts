import { convert } from "./lib";

const args = process.argv.splice(2);

if (args.length < 2) {
  console.log("Usage : node converter.js <startTime> <endTime?> <timezone>");
  process.exit(0);
}

const tz = args.pop() as string;
console.log(convert(args.join(" "), tz));
