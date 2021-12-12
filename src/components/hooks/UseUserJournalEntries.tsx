import { useCurrentUser } from "./UseCurrentUser";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { JournalEntry } from "../../Types";
import { db } from "../../firebase";

export function useJournalEntriesRef() {
  const user = useCurrentUser();
  return db.collection("users").doc(user?.uid).collection("journal-entries");
}

export function useJournalEntries() {
  const journalEntriesRef = useJournalEntriesRef(); //uses the above hook

  return useCollectionData<JournalEntry>(journalEntriesRef);
}
