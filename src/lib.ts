import { parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

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
 * Parse a string containing one or two times. Handles various syntaxes.
 * @param toParse time range to parse
 * @returns An object containing the start and end times' features
 */
function parseTimeRange(toParse: string): TimestampRange {
  const parsed = [...toParse.toLowerCase().matchAll(timeRangeRegex)];
  return {
    start: {
      hour: parsed[0][1],
      meridiem: parsed[0][2] ?? parsed[0][4],
      minutes: parsed[0][3] ?? "0",
    },
    end: parsed[1] && {
      hour: parsed[1][1],
      meridiem: parsed[1][2] ?? parsed[1][4],
      minutes: parsed[1][3] ?? "0",
    },
  };
}

/**
 * Convert a Timestamp object to a Date
 * @param ts Timestamp to convert
 * @param tz Timezone of the timestamp
 * @returns The Date
 */
function timeStampToDate(ts: Timestamp, tz: string): Date {
  let date: Date;
  if (ts.meridiem) {
    date = parse(
      `${ts.hour}:${ts.minutes}${ts.meridiem}`,
      "hh:mma",
      new Date()
    );
  } else {
    date = parse(`${ts.hour}:${ts.minutes}`, "HH:mm", new Date());
  }
  return zonedTimeToUtc(date, tz);
}

export class TZRangeConverter {
  private aliases: Record<string, string>;

  /**
   * Converter class
   * @param aliases Object containing key-value pairs of aliases for tz database timezones
   */
  constructor(aliases?: Record<string, string>) {
    this.aliases = aliases ?? {};
  }

  /**
   * Conversion function
   * @param rangeToParse Time range to parse
   * @param tz Timezone of given timerange, either a tz database name or an alias, set by the aliases.json file.
   * @param outputFormat DateTimeFormat of the output string. default is local format w/ short timeStyle
   * @returns The time range converted to the local time zone
   */
  public convert(
    rangeToParse: string,
    tz: string,
    outputFormat = defaultTimeFormat
  ): string {
    if (tz in this.aliases) {
      tz = this.aliases[tz as keyof typeof this.aliases];
    }

    const range = parseTimeRange(rangeToParse);

    const startDate = timeStampToDate(range.start, tz);
    const formattedStart = outputFormat.format(startDate);

    let localRange = formattedStart;

    if (range.end) {
      const endDate = timeStampToDate(range.end, tz);
      const formattedEnd = outputFormat.format(endDate);
      localRange += " - " + formattedEnd;
    }

    localRange += " local time";

    return localRange;
  }
}
