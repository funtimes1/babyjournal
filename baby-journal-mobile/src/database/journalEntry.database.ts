import { firestoreCollectionRef } from '../backend/Firestore.backend';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { format } from 'date-fns';
import { dateFormats } from '../lib/date';
import firebase from 'firebase';
import cuid from 'cuid';

type Photo = {
  url: string;
  caption?: string;
};

type JournalEntry = {
  date: string; // 'yy-mm-dd'
  title?: string; // ie. "FIRST STEP!" but defaults to date if not present
  notes?: string; // how the day felt? any hightlights? summary?
  // See event type below****	events: Event[]; //button to add a new event, leads to a list of categories, user selects
  //category, leads to a simple form - "event type"
  photos?: [Photo]; // array of photo objects (in this case exactly ONE Photo object)
};

export function useJournalEntries() {
  return useCollectionData<JournalEntry>(firestoreCollectionRef('journal-entries'));
}

export function saveNewJournalEntry(newDate: Date) {
  const date = format(newDate, dateFormats.database);
  const updatedAt = Date.now();
  firestoreCollectionRef('journal-entries').doc(date).set({
    date,
    title: `new journal entry`,
    updatedAt,
    photos: [],
  });
}

export function saveNewJournalEntryPhoto(newDate: Date) {
  const date = format(newDate, dateFormats.database);
  const updatedAt = Date.now();
  firestoreCollectionRef('journal-entries')
    .doc(date)
    .update({
      date,
      title: `new journal entry`,
      updatedAt,
      photos: firebase.firestore.FieldValue.arrayUnion({
        // url: `https://placekitten.com/g/200/200`,
        caption: `kitten - ${cuid()}`,
      }),
    });
}
