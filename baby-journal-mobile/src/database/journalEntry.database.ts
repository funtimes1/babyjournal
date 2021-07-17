import { firestoreCollectionRef } from '../backend/Firestore.backend';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { format } from 'date-fns';
import { dateFormats } from '../lib/date';
import firebase from 'firebase';
import cuid from 'cuid';
import { useUser } from '../backend/Auth.backend';
import React from 'react';
import { useDayStore } from '../stores/Day.store';

export function useUploadImage() {
  const user = useUser();
  const { selectedDay } = useDayStore();
  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const uploadImage = async (imageUri: string) => {
    setUploading(true);
    // Fetch the photo with it's local URI
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Create a ref in Firebase (I'm using my user's ID)
    const ref = firebase
      .storage()
      .ref()
      .child(
        `the-images/${user?.uid ?? 'none'}/${format(selectedDay, dateFormats.database)}/${cuid()}`,
      );

    // Upload Base64 image to Firebase
    // const task = ref.putString(file, 'base64');
    const task = ref.put(blob);
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, (snap) => {
      setProgress(Math.round(snap.bytesTransferred / snap.totalBytes) * 100);
    });
    const snapshot = await task;

    // Create a download URL
    const remoteURL = await snapshot.ref.getDownloadURL();
    setUploading(false);
    // Return the URL
    return remoteURL;
  };
  return [uploadImage, uploading, progress] as const;
}

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

export function saveNewJournalEntryPhoto(
  date: Date,
  photo: { url: string; caption: string | null },
) {
  const day = format(date, dateFormats.database);
  const updatedAt = Date.now();
  return firestoreCollectionRef('journal-entries')
    .doc(day)
    .set(
      {
        date: day,
        updatedAt,
        photos: firebase.firestore.FieldValue.arrayUnion(photo),
      },
      { merge: true },
    );
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
