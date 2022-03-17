// firestore path: /users/<firebaseAuthUserID>/journal-entries/<dateID>
export type JournalEntry = {
  title: string | null;
  date: string; // yyyy-mm-dd (also the unique id for this journal entry)
  notes: string | null; // overall summary of day
  // events are stored in a subcollection so they don't exist on the JournalEntry type events: Events[]; //button to add a new event, leads to a list of categories, user selects category, leads to a simple "event" form, which opens up on the same page
  photos: Photo[] | null;
};

// list of notes / things that happened throughout the day
//gets the list of all event
// firestore path: /users/<firebaseAuthUserID>/journal-entries/<dateID>/events/<documentCUID>
export type Event = {
  id: string; // cuid();
  category: string; // a Category ID
  notes: string;

  duration?: number; // in minutes (with nice UI to select hours as well)
};

export type Photo = {
  url: string; // this url is the result from the upload process
  caption?: string;
};

// firestore path: /users/<firebaseAuthUserID>/categories/<'category-name'>
export type Category = {
  name: string; // 'feeding', 'napping', 'first-action' etc. kebab-case-because-it-looks-like-a-skewer
  displayName?: string; // display version of the category 'feeding' -> 'Feeding', 'first-action' -> 'First Action'
  color?: string; // a hex value for nice displaying
};

// firestore path: /users/<firebaseAuthUserID>/user-profile/<ID>
export type UserProfile = {
  displayName: string;
  profilePicUrl: string;
  email: string;
  babyDOB: Date;
};

export type AuthFormInput = {
  email: string;
  password: string;
};
