import cuid from "cuid";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useCurrentUser } from "../components/hooks/UseCurrentUser";
import { useDateStore } from "../components/useStore";
import { db } from "../firebase";
import { Event, JournalEntry } from "../Types";
import { formatDate } from "../utils/formatDate";

export function useAddEvent() {
  const user = useCurrentUser();
  const upsertEvent = async (dateId: string, data: Event) => {
    try {
      //journal entry
      const journalEntryPath = `users/${user?.uid}/journal-entries`;
      const journalRef = doc(db, journalEntryPath, dateId);

      //event entries
      const eventsPath = `users/${user?.uid}/journal-entries/${dateId}/events`;
      const eventRef = doc(db, eventsPath, data.id);
      console.log("started");

      //moved the above journal and event refs within the function to have/create only one ID when adding event

      const journalSnap = await getDoc(journalRef);
      if (!journalSnap.exists()) {
        // create a new blank journal entry object and save it before adding the event data
        const newJournal: JournalEntry = {
          date: dateId,
          title: "",
          notes: "",
          photos: [],
        };
        await setDoc(journalRef, newJournal);
      }
      await setDoc(eventRef, data);
    } finally {
      console.log("finished");
    }
  };

  return upsertEvent;
}
