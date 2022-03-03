import { useCurrentUser } from "./UseCurrentUser";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { JournalEntry } from "../../Types";
import { app, db } from "../../firebase";
import { useDateStore } from "../useStore";
import { formatDate } from "../../utils/formatDate";

export function useJournalEntriesRef() {
  const user = useCurrentUser();
  const journalEntriesPath = `users/${user?.uid}/journal-entries`;

  // return db().collection("users").doc(user?.uid).collection("journal-entries");
  // return collection(getFirestore(app), journalEntriesPath);
  return collection(db, journalEntriesPath);
}

export function useAddJournalEntry() {
  const user = useCurrentUser();
  const { selectedDate } = useDateStore();
  const dateId = formatDate(selectedDate);
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
  //QUESTION: line 32, what is "data" for??
}
// const user = useCurrentUser();
// const journalEntriesPath = `users/${user?.uid}/journal-entries`;

// export const deleteJournal = async (dateId: string) => {
//   try {
//     console.log("started");
//     await deleteDoc(doc(db, journalEntriesPath, dateId));
//   } catch (error) {
//     console.error(error);
//   } finally {
//     console.log("finished");
//   }
// };

export function useJournalEntries(dateId: string) {
  const journalEntriesRef = useJournalEntriesRef(); //uses the above hook

  return useCollectionData<JournalEntry>(journalEntriesRef);
}
