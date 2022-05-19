export const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

export const stockDays = [
  {
    label: "24 Hours",
    granularity: "TIME_SERIES_INTRADAY",
    resKey: "Time Series (5min)"
  },
  {
    label: "Daily",
    granularity: "TIME_SERIES_DAILY",
    resKey: "Time Series (Daily)"
  },
  {
    label: "Weekly",
    granularity: "TIME_SERIES_WEEKLY",
    resKey: "Weekly Time Series"
  },
  {
    label: "Monthly",
    granularity: "TIME_SERIES_MONTHLY",
    resKey: "Monthly Time Series"
  },
];
