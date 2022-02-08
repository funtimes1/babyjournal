import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "firebase/firestore";
import { app, db } from "../../firebase";
import { Events } from "../../Types";
import { useCurrentUser } from "./UseCurrentUser";

export function useJournalEntryEventsRef(dateID: string) {
  //to add new journal event
  const user = useCurrentUser();

  const eventsPath = `users/${user?.uid}/journal-entries/${dateID}/events`;

  //   return db()
  //     .collection("users")
  //     .doc(user?.uid)
  //     .collection("journal-entries")
  //     .doc(dateID)
  //     .collection("events");
  // }

  return db().collection(getFirestore(app), eventsPath);
}
// QUESTION: Is line 21 correct - replaces the former ".collection.doc.." etc?

export function useJournalEntryEvents(dateID: string) {
  const journalEntriesEventsRef = useJournalEntryEventsRef(dateID); //uses the above hook
  console.log(journalEntriesEventsRef.path);
  return useCollectionData<Events>(journalEntriesEventsRef);
}
