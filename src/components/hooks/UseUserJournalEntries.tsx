import { useCurrentUser } from "./UseCurrentUser";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "firebase/firestore";

import { JournalEntry } from "../../Types";
import { app, db } from "../../firebase";

export function useJournalEntriesRef() {
  const user = useCurrentUser();
  const journalEntriesPath = `users/${user?.uid}/journal-entries`;

  // return db().collection("users").doc(user?.uid).collection("journal-entries");
  return db().collection(getFirestore(app), journalEntriesPath);
}
//QUESTION: Is line 13 correct - replaces the former ".collection.doc.." etc?

export function useJournalEntries() {
  const journalEntriesRef = useJournalEntriesRef(); //uses the above hook

  return useCollectionData<JournalEntry>(journalEntriesRef);
}
