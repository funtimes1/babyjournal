import cuid from "cuid";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useCurrentUser } from "../components/hooks/UseCurrentUser";
import { useDateStore } from "../components/useStore";
import { db } from "../firebase";
import { Event, JournalEntry, Photo } from "../Types";
import { formatDate } from "../utils/formatDate";

export function useAddPhotos() {
  const user = useCurrentUser();
  const { selectedDate } = useDateStore();
  const dateId = formatDate(selectedDate);
  const id = cuid();

  //journal entry
  const journalEntryPath = `users/${user?.uid}/journal-entries`;
  const journalRef = doc(db, journalEntryPath, dateId);

  //event entries
  //   const eventsPath = `users/${user?.uid}/journal-entries/${dateId}/events`;
  //   const eventRef = doc(db, eventsPath, id);

  const upsertPhoto = async (dateId: string, data: Photo) => {
    try {
      console.log("started");
      const journalSnap = await getDoc(journalRef);
      if (!journalSnap.exists()) {
        // create a new blank journal entry object and save it before adding the photo data
        const newJournal: JournalEntry = {
          date: dateId,
          title: "",
          notes: "",
          photos: [],
        };
        await setDoc(journalRef, newJournal);
      }
      // await add photo+update photos array in the journal entry
      //   await setDoc(eventRef, data);
    } finally {
      console.log("finished");
    }
  };

  return upsertPhoto;
}

//click on upload file
//choose photo
//save photo to the journal entry object in an array of photos
//display photos
