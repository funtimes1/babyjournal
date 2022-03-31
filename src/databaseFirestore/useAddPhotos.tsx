import cuid from "cuid";
import { doc, setDoc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useCurrentUser } from "../components/hooks/UseCurrentUser";
import { useDateStore } from "../components/useStore";
import { db, storage } from "../firebase";
import { JournalEntry, Photo } from "../Types";
import { formatDate } from "../utils/formatDate";

export function useAddPhotos() {
  const user = useCurrentUser();
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);
  const id = cuid();

  const journalEntryPath = `users/${user?.uid}/journal-entries`;
  const journalRef = doc(db, journalEntryPath, formattedDate);

  const upsertPhoto = async (dateId: string, data: Photo, file: File) => {
    const storageRef = ref(
      storage,
      "the-images/" + id + formattedDate + file.name
    );

    try {
      console.log("started");
      const journalSnap = await getDoc(journalRef);
      if (!journalSnap.exists()) {
        // create a new blank journal entry object and save it before adding the photo data
        const newJournal: JournalEntry = {
          date: dateId,
          title: "",
          notes: "",
          photos: [],
        };
        await setDoc(journalRef, newJournal);
      }

      await uploadBytes(storageRef, file).then(
        // (err) => {
        //   setError(err.message);
        //}, //function is fired when upload is complete and gets the url when completed

        async () => {
          await setDoc(journalRef, data);

          const url = await getDownloadURL(storageRef);

          await updateDoc(journalRef, { photo: arrayUnion(url) });
          return url;
          //   setUrl(url);
        }
      );

      //       await add photo with created upload file function
      //+ update photos array in the journal entry
      //       const newPhoto: JournalEntry = {
      //           date: dateId,
      //           title: "",
      //           notes: "",
      //           photos: [],
      //       };
      //       await updateDoc(journalRef, {
      //           photos: arrayUnion(url)
      //       })
      //   }
    } finally {
      console.log("finished");
    }
  };

  return upsertPhoto;
}
