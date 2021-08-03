import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { Events } from "../../Types";
import { useCurrentUser } from "./UseCurrentUser";

export function useJournalEntryEventsRef(dateID: string) {
  //to add new journal event
  const user = useCurrentUser();
  return firestore
    .collection("users")
    .doc(user?.uid)
    .collection("journal-entries")
    .doc(dateID)
    .collection("events");
}

export function useJournalEntryEvents(dateID: string) {
  const journalEntriesEventsRef = useJournalEntryEventsRef(dateID); //uses the above hook

  return useCollection<Events>(journalEntriesEventsRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
}
