import cuid from "cuid";
import { doc, setDoc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCurrentUser } from "../components/hooks/UseCurrentUser";
import { useDateStore } from "../components/useStore";
import { db, storage } from "../firebase";
import { Photo } from "../Types";
import { formatDate } from "../utils/formatDate";
export async function uploadFile(file: File, data: Photo) {
  // creates reference to the file inside the default firebase storage when uploaded with the file name

  const user = useCurrentUser();
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);
  const id = cuid();
  const storageRef = ref(
    storage,
    "the-images/" + id + formattedDate + file.name
  );

  const journalEntryPath = `users/${user?.uid}/journal-entries`;
  const journalRef = doc(db, journalEntryPath, formattedDate);

  const result = await uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!", { result });
  });
  const url = await getDownloadURL(storageRef);
  await updateDoc(journalRef, { url: arrayUnion(url) });
  return url;
}
