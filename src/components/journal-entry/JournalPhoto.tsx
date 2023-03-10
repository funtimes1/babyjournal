import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadFile } from "../../databaseFirestore/uploadFile";
import { db, storage } from "../../firebase";
import { Layout } from "../../theme/Layout.components";
import { JournalEntry, Photo } from "../../Types";
import { formatDate } from "../../utils/formatDate";
import { useCurrentUser } from "../hooks/UseCurrentUser";
import { useDateStore } from "../useStore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { deleteObject, ref } from "firebase/storage";

//adds and displays photos
export const JournalPhoto: React.FC = () => {
  const { selectedDate } = useDateStore();
  const user = useCurrentUser();
  const formattedDate = formatDate(selectedDate);
  const journalEntryPath = `users/${user?.uid}/journal-entries/${formattedDate}`;
  const journalRef = doc(db, journalEntryPath);
  const types = ["image/png", "image/jpeg"];
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Photo>({
    defaultValues: {
      url: "",
      caption: "",
      id: "",
    },
  });

  const onSubmit = async (value: Photo) => {
    console.log("submit", value);
    const { url, caption, id } = value;
    const photo = {
      url,
      caption,
      id,
    };

    // check to see if there is a journal and if not create a blank one
    const journalSnap = await getDoc(journalRef);
    if (!journalSnap.exists()) {
      const newJournal: JournalEntry = {
        date: formattedDate,
        title: "",
        notes: "",
        photos: [],
      };
      await setDoc(journalRef, newJournal);
    }
    await updateDoc(journalRef, { photos: arrayUnion(photo) });
    //resets form (removes file name)

    reset();
  };

  return (
    <Layout.Column px py radius={10} bg="pink-200">
      Add photo
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* using onChange to set url photo before uploading it to firestore via onsubmit 
        onSubmit uploads file to firestore  */}
        <input
          onChange={async (event) => {
            setIsLoading(true);
            if (user) {
              // console.log(event.target.files);
              // takes the first element of the array
              const [file] = event.target.files ?? [];
              // added id to Photo array to make reference for deleting this file (id created when creating url in uploadFile)
              if (file && types.includes(file.type)) {
                const { url, id } = await uploadFile(file, user, formattedDate);
                setIsLoading(false);
                setValue("url", url);
                setValue("id", id);
              }
            } else {
              setError("Please upload an image file (png or jpeg)");
            }
          }}
          type="file"
          name="image"
        />
        <input
          {...register("caption")}
          type="text"
          name="caption"
          placeholder="Add a caption"
        />

        <button disabled={isLoading}>Submit</button>
      </form>
      {/* removed the firestoreimagecollection out of the form as it was calling delete and submit button (causing it to upload an empty photo array)  */}
      <FirestoreImageCollection />
    </Layout.Column>
  );
};

const FirestoreImageCollection = () => {
  const { selectedDate } = useDateStore();
  const user = useCurrentUser();
  const formattedDate = formatDate(selectedDate);
  const journalEntryPath = `users/${user?.uid}/journal-entries/${formattedDate}`;
  const journalRef = doc(db, journalEntryPath);

  const [journalEntry, loading] = useDocumentData<JournalEntry>(
    doc(db, journalEntryPath)
  );
  const deletePhoto = async (value: Photo) => {
    const { url, caption, id } = value;
    const photo = {
      url,
      caption,
      id,
    };
    try {
      console.log("photo", photo);
      const photoRef = ref(
        storage,
        `the-images/${user?.uid}/${formattedDate}/${id}`
      );
      await updateDoc(journalRef, {
        photos: arrayRemove(photo),
      });
      await deleteObject(photoRef);
    } finally {
      console.log("finished");
    }
  };

  return (
    <Layout.Column>
      {journalEntry?.photos?.map((photo, index) => {
        return (
          <div key={`photo-${index}`}>
            <img src={photo.url} alt="images" width={300} height={200} />
            <p>{photo.caption}</p>
            <button onClick={() => deletePhoto(photo)}> delete </button>
          </div>
        );
      })}
    </Layout.Column>
  );
};
