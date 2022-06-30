import { convert } from "./lib";

const args = process.argv.splice(2);
const tz = args.pop() as string;
console.log(convert(args.join(" "), tz));
