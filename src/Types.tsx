import React from "react";

export type JournalEntry = {
  id: string; //cuid
  date: Date; //createdAt
  title?: string; //defaults to event if no title is provided
  notes?: string; // overall summary of day
  events: Events[]; //button to add a new event, leads to a list of categories, user selects category, leads to a simple "event" form, which opens up on the same page
  photos?: [Photo];
};

// list of notes / things that happened throughout the day
//gets the list of all event
// firestore path: /users/<firebaseAuthUserID>/journal-entries/<documentCUID>/events/<documentCUID>
export type Events = {
  id: string; // cuid();
  category: string; // a Category ID
  notes: string;
  //   time: DateTime; // defaults to current time, but is editable (past or future)
  duration?: number; // in minutes (with nice UI to select hours as well)
};

export type Photo = {
  url: string;
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
