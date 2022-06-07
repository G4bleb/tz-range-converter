import moment from "moment-timezone";
import links from "./assets/links.json";

moment.tz.link(links);

const timeFormat = new Intl.DateTimeFormat(undefined, {
  timeStyle: "short",
});

/**
 * Parse a time (start or end of a range)
 * @param toParse time to parse
 * @param tz timezone of the parsed time
 * @returns A moment.tz object of the time
 */
function parseTime(toParse: string, tz: string): moment.Moment {
  if (toParse.toLowerCase().includes("m")) {
    return moment.tz(toParse, "hha", tz);
  } else {
    return moment.tz(toParse, "HH:mm", tz);
  }
}

/**
 * Conversion function
 * @param range Timerange to parse, separated by a dash -
 * @param tz Timezone of given timerange, either a tz database name or an alias, set by the links.json file.
 * @param outputFormat DateTimeFormat of the output string. default is local format w/ short timeStyle
 * @returns The time range converted to the local time zone
 */
export function convert(
  range: string,
  tz: string,
  outputFormat = timeFormat
): string {
  const [startStr, endStr] = range.split("-");
  // Example: 11pm-4am ET
  const startDate = parseTime(startStr, tz);
  const endDate = parseTime(endStr, tz);

  const formattedStart = outputFormat.format(startDate.toDate());
  const formattedEnd = outputFormat.format(endDate.toDate());

  const localRange = `${formattedStart} - ${formattedEnd} local time`;
  return localRange;
}
