import { TZRangeConverter } from "./lib";

const aliases = {
  PT: "America/Los_Angeles",
  PDT: "America/Los_Angeles",
  ET: "America/New_York",
  EST: "America/New_York",
  EDT: "America/New_York",
  IST: "Asia/Calcutta",
};

const args = process.argv.splice(2);

if (args.length < 2) {
  console.log("Usage : node converter.js <startTime> <endTime?> <timezone>");
  process.exit(0);
}

const tz = args.pop() as string;
const converter = new TZRangeConverter(aliases);

try {
  console.log(converter.convert(args.join(" "), tz));
} catch (error) {
  console.error(error);
  process.exit(1);
}
