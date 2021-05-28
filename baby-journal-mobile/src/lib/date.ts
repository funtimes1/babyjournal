export const dateFormats = {
  long: 'EEEE, MMMM do yyyy',
  database: 'yyyy-MM-dd',
} as const;

export const dateFormatSkeleton = {
  abbreviated: 'yMMMdd',
  abbreviatedWithDay: 'EEEyMMMdd',
  numeric: 'yMd',
  month: 'MMM',
  day: 'dd',
} as const;
