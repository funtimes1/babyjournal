import { firestore } from "../../firebase";
import { useCurrentUser } from "./UseCurrentUser";

export function useJournalEntriesFirestoreRef() {
  const user = useCurrentUser();
  return firestore
    .collection("users")
    .doc(user?.uid)
    .collection("journal-entries");
}
