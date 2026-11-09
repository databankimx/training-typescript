// Midnight UTC on 9 November 2026. The time zone is named in the formatter, so the printed day never shifts.
const moment: Date = new Date(Date.UTC(2026, 10, 9));

const longDate: Intl.DateTimeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "long",
  day: "numeric",
});

console.log(longDate.format(moment));
