import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../firebase";
import { Event } from "../../Types";
import { useCurrentUser } from "./UseCurrentUser";
import { useDateStore } from "../useStore";
import { formatDate } from "../../utils/formatDate";

export function useJournalEntryEventsRef() {
  //to add new journal event
  const user = useCurrentUser();
  const { selectedDate } = useDateStore();
  const dateId = formatDate(selectedDate);
  const eventsPath = `users/${user?.uid}/journal-entries/${dateId}/events`;

  //   return db()
  //     .collection("users")
  //     .doc(user?.uid)
  //     .collection("journal-entries")
  //     .doc(dateID)
  //     .collection("events");
  // }

  return collection(getFirestore(app), eventsPath);
}

export function useAddEvents() {
  const user = useCurrentUser();
  const { selectedDate } = useDateStore();
  const dateId = formatDate(selectedDate);

  const eventsPath = `users/${user?.uid}/journal-entries/${dateId}/events`;
  const addJournalEvent = async (id: string, data: Event) => {
    try {
      console.log("started");
      await setDoc(doc(getFirestore(app), eventsPath, id), data);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finished");
    }
  };
  return addJournalEvent;
}

export function useJournalEntryEvents() {
  const journalEntriesEventsRef = useJournalEntryEventsRef(); //uses the above hook
  console.log(journalEntriesEventsRef.path);
  // @ts-expect-error

  return useCollectionData<Event>(journalEntriesEventsRef);
}
