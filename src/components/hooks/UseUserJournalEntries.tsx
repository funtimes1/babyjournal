import { firestore } from "../../firebase";
import { useCurrentUser } from "./UseCurrentUser";
import { useCollection } from "react-firebase-hooks/firestore";
import { JournalEntry } from "../../Types";

export function useJournalEntriesRef() {
  const user = useCurrentUser();
  return firestore
    .collection("users")
    .doc(user?.uid)
    .collection("journal-entries");
}

export function useJournalEntries() {
  const journalEntriesRef = useJournalEntriesRef(); //uses the above hook

  return useCollection<JournalEntry>(journalEntriesRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
}
