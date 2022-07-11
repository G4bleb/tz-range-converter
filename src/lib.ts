import moment from "moment-timezone";
import links from "./assets/links.json";

moment.tz.link(links);

const defaultTimeFormat = new Intl.DateTimeFormat(undefined, {
  timeStyle: "short",
});

interface Timestamp {
  hour: string;
  meridiem?: string; // am/pm
  minutes: string;
}

interface TimestampRange {
  start: Timestamp;
  end: Timestamp;
}

const timeRangeRegex = /(\d{1,2})[:h]?(am|pm)?(\d{2})?(am|pm)?/g;

/**
 * Parse a string containing two times. Handles various syntax.
 * @param toParse time range to parse
 * @returns An object containing the start and end times' features
 */
function parseTimeRange(toParse: string): TimestampRange {
  const parsed = [...toParse.toLowerCase().matchAll(timeRangeRegex)];
  return {
    start: {
      hour: parsed[0][1],
      meridiem: parsed[0][2] ?? parsed[0][4],
      minutes: parsed[0][3],
    },
    end: parsed[1] && {
      hour: parsed[1][1],
      meridiem: parsed[1][2] ?? parsed[1][4],
      minutes: parsed[1][3],
    },
  };
}

/**
 * Convert a Timestamp object to a moment-timezone object
 * @param ts Timestamp to convert
 * @param tz Timezone of the timestamp
 * @returns The moment-timezone object
 */
function timeStampToMoment(ts: Timestamp, tz: string): moment.Moment {
  if (ts.meridiem) {
    return moment.tz(`${ts.hour}:${ts.minutes}${ts.meridiem}`, "hh:mma", tz);
  } else {
    return moment.tz(`${ts.hour}:${ts.minutes}`, "HH:mm", tz);
  }
}

/**
 * Conversion function
 * @param rangeToParse Time range to parse
 * @param tz Timezone of given timerange, either a tz database name or an alias, set by the links.json file.
 * @param outputFormat DateTimeFormat of the output string. default is local format w/ short timeStyle
 * @returns The time range converted to the local time zone
 */
export function convert(
  rangeToParse: string,
  tz: string,
  outputFormat = defaultTimeFormat
): string {
  const range = parseTimeRange(rangeToParse);

  const startDate = timeStampToMoment(range.start, tz);
  const formattedStart = outputFormat.format(startDate.toDate());

  let localRange = formattedStart;

  if (range.end) {
    const endDate = timeStampToMoment(range.end, tz);
    const formattedEnd = outputFormat.format(endDate.toDate());
    localRange += " - " + formattedEnd;
  }

  localRange += " local time";

  return localRange;
}
