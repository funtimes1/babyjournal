import { useCurrentUser } from "./UseCurrentUser";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import { JournalEntry } from "../../Types";
import { db } from "../../firebase";
import { useDateStore } from "../useStore";
import { formatDate } from "../../utils/formatDate";

export function useJournalEntriesRef() {
  const user = useCurrentUser();
  const journalEntriesPath = `users/${user?.uid}/journal-entries`;

  // return db().collection("users").doc(user?.uid).collection("journal-entries");
  // return collection(getFirestore(app), journalEntriesPath);
  return collection(db, journalEntriesPath);
}
export function useJournalEntryRef(dateId: string) {
  const user = useCurrentUser();
  const journalEntryPath = `users/${user?.uid}/journal-entries/${dateId}`;

  // return db().collection("users").doc(user?.uid).collection("journal-entries");
  // return collection(getFirestore(app), journalEntriesPath);
  return doc(db, journalEntryPath);
}
export function useAddJournalEntry() {
  const user = useCurrentUser();
  const journalEntriesPath = `users/${user?.uid}/journal-entries`;
  const addJournalEntry = async (dateId: string, data: JournalEntry) => {
    try {
      console.log("started");
      await setDoc(doc(db, journalEntriesPath, dateId), data);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finished");
    }
  };
  return addJournalEntry;
}

export function useJournalEntries() {
  const journalEntriesRef = useJournalEntriesRef(); //uses the above hook

  // @ts-expect-error
  return useCollectionData<JournalEntry>(journalEntriesRef);
}

//for singular journal entry (journal entry is a document not collection, no need to map over!)
export function useJournalEntry(dateId: string) {
  const journalEntryRef = useJournalEntryRef(dateId); //uses the above hook

  // @ts-expect-error
  return useDocumentData<JournalEntry>(journalEntryRef);
}
