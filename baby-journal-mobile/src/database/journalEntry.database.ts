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

type Event = {
  category: string;
  time: number;
  duration: number | null;
  notes: string | null;
};

export function useJournalEntries() {
  return useCollectionData<JournalEntry>(firestoreCollectionRef('journal-entries'));
}

export function useJournalEntryEvents(date: Date) {
  const day = format(date, dateFormats.database);
  return useCollectionData<Event & { id: string }>(
    firestoreCollectionRef('journal-entries', `${day}/events`),
  );
}

export function saveNewJournalEntryEvent(
  date: Date,
  event: { category: string; time: Date; duration: number | null; notes: string | null },
) {
  const id = cuid();
  const day = format(date, dateFormats.database);
  const updatedAt = Date.now();
  return firestoreCollectionRef('journal-entries')
    .doc(day)
    .collection('events')
    .doc(id)
    .set({
      ...event,
      time: event.time.getTime(),
      id,
      updatedAt,
    });
}

export function saveNewJournalEntryPhoto(date: Date, photo: { url: string; caption?: string }) {
  const day = format(date, dateFormats.database);
  const updatedAt = Date.now();
  return firestoreCollectionRef('journal-entries')
    .doc(day)
    .update({
      date,
      updatedAt,
      photos: firebase.firestore.FieldValue.arrayUnion(photo),
    });
}

// export function saveNewJournalEntryPhoto(newDate: Date) {
//   const date = format(newDate, dateFormats.database);
//   const updatedAt = Date.now();
//   firestoreCollectionRef('journal-entries')
//     .doc(date)
//     .update({
//       date,
//       title: ``,
//       updatedAt,
//       photos: firebase.firestore.FieldValue.arrayUnion({
//         // url: `https://placekitten.com/g/200/200`,
//         caption: `kitten - ${cuid()}`,
//       }),
//     });
// }