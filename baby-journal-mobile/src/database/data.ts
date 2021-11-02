export type JournalPhoto = {
  url: string;
  caption?: string;
};

export type JournalEntry = {
  date: string; // 'yy-mm-dd'
  title?: string; // ie. "FIRST STEP!" but defaults to date if not present
  notes?: string; // how the day felt? any hightlights? summary?
  // See event type below****	events: Event[]; //button to add a new event, leads to a list of categories, user selects
  //category, leads to a simple form - "event type"
  photos?: [JournalPhoto]; // array of photo objects (in this case exactly ONE Photo object)
};

export type JournalEvent = {
  category: string;
  time: number;
  duration: number | null;
  notes: string | null;
};
