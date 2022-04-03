import cuid from "cuid";
import { User } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

//can't call hooks inside a function only inside a component, feed in the user and date as parameters(or arguments) rather than hooks
export async function uploadFile(
  file: File,
  user: User,
  formattedDate: string
) {
  // creates reference to the file inside the default firebase storage when uploaded with the file name

  //changed from hook to a regular function by using .getState() because we cant call a hook in a reg func
  // const { selectedDate } = useDateStore.getState();
  // const formattedDate = formatDate(selectedDate);
  const id = cuid();
  const storageRef = ref(
    storage,
    `the-images/${user?.uid}/${formattedDate}/${id}`
  );
  const result = await uploadBytes(storageRef, file);
  console.log("result", result);
  const url = await getDownloadURL(storageRef);
  console.log("url", url);
  return url;
}
