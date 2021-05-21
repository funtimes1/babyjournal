import { firestore } from "../../firebase";
import { useCurrentUser } from "./UseCurrentUser";

export function useUserJournalEntries() {
  const user = useCurrentUser();
  // console.log(user.uid);
  return firestore
    .collection("users")
    .doc(user?.uid)
    .collection("journal-entries");
}
