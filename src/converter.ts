import moment from "moment-timezone";

moment.tz.link(["PT|America/Los_Angeles"]);
moment.tz.link(["ET|America/New_York"]);

const timeFormat = new Intl.DateTimeFormat("fr-FR", {
  timeStyle: "short",
});

// console.log(process.argv);
if (process.argv.length !== 4) {
  console.error("Erro : wrong number of arguments");
  process.exit(1);
}

const [range, tz] = process.argv.splice(2);
const [startStr, endStr] = range.split("-");

// 11pm-4am ET
const startDate = moment.tz(startStr, "hha", tz);
const endDate = moment.tz(endStr, "hha", tz);

const formattedStart = timeFormat.format(startDate.toDate());
const formattedEnd = timeFormat.format(endDate.toDate());

const localRange = `${formattedStart} - ${formattedEnd} local time`;
console.log(localRange);
