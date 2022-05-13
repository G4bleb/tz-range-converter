import moment from "moment-timezone";
import { links } from "./links";

moment.tz.link(links);

const timeFormat = new Intl.DateTimeFormat(undefined, {
  timeStyle: "short",
});

function parseTime(toParse: string, tz: string): moment.Moment {
  if (toParse.toLowerCase().includes("m")) {
    return moment.tz(toParse, "hha", tz);
  } else {
    return moment.tz(toParse, "HH:mm", tz);
  }
}

// console.log(process.argv);
if (process.argv.length !== 4) {
  console.error("Error : wrong number of arguments");
  process.exit(1);
}

const [range, tz] = process.argv.splice(2);
const [startStr, endStr] = range.split("-");

// 11pm-4am ET
const startDate = parseTime(startStr, tz);
const endDate = parseTime(endStr, tz);

const formattedStart = timeFormat.format(startDate.toDate());
const formattedEnd = timeFormat.format(endDate.toDate());

const localRange = `${formattedStart} - ${formattedEnd} local time`;
console.log(localRange);
