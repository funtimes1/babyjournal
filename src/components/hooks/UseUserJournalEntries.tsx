import { useCurrentUser } from "./UseCurrentUser";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { JournalEntry } from "../../Types";
import { app, db } from "../../firebase";
import { useDateStore } from "../useStore";
import { formatDate } from "../../utils/formatDate";

export function useJournalEntriesRef() {
  const user = useCurrentUser();
  const journalEntriesPath = `users/${user?.uid}/journal-entries`;

  // return db().collection("users").doc(user?.uid).collection("journal-entries");
  return collection(getFirestore(app), journalEntriesPath);
}

export function useAddJournalEntry() {
  const user = useCurrentUser();
  const { selectedDate } = useDateStore();
  const dateId = formatDate(selectedDate);
  const journalEntriesPath = `users/${user?.uid}/journal-entries`;
  const addJournalEntry = async (dateId: string, data: JournalEntry) => {
    try {
      console.log("started");
      await setDoc(doc(getFirestore(app), journalEntriesPath, dateId), data);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finished");
    }
  };
  return addJournalEntry;
}

export function useJournalEntries(dateId: string) {
  const journalEntriesRef = useJournalEntriesRef(); //uses the above hook

  return useCollectionData<JournalEntry>(journalEntriesRef);
}
