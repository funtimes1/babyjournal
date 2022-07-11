import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteField,
  arrayRemove,
} from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { uploadFile } from "../../databaseFirestore/uploadFile";
import { db } from "../../firebase";
import { Layout } from "../../theme/Layout.components";
import { JournalEntry, Photo } from "../../Types";
import { formatDate } from "../../utils/formatDate";
import { useCurrentUser } from "../hooks/UseCurrentUser";
import { useDateStore } from "../useStore";
import { useDocumentData } from "react-firebase-hooks/firestore";

//adds and displays photos
export const JournalPhoto: React.FC = () => {
  const { selectedDate } = useDateStore();
  const user = useCurrentUser();
  const formattedDate = formatDate(selectedDate);
  const journalEntryPath = `users/${user?.uid}/journal-entries/${formattedDate}`;
  const journalRef = doc(db, journalEntryPath);
  const types = ["image/png", "image/jpeg"];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Photo>({
    defaultValues: {
      url: "",
      caption: "",
    },
  });

  const onSubmit = async (value: Photo) => {
    const { url, caption } = value;
    const photo = {
      url,
      caption,
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
    // clear out the form state //setValue to empty url and caption
    // await setValue("url", "");
  };

  return (
    <Layout.Column px py radius={10} bg="pink-200">
      Add photo
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* using onChange to set url photo before uploading it to firestore via onsubmit 
        onSubmit to upload file to firestore  */}
        <input
          onChange={async (event) => {
            //using if here to ensure user is exists
            if (user) {
              console.log(event.target.files);
              // takes the first element of the array
              const [file] = event.target.files ?? [];
              const url = await uploadFile(file, user, formattedDate);
              setValue("url", url);
            }
          }}
          type="file"
          name="image"
        />
        <input {...register("caption")} type="text" name="caption" />

        <button>Submit</button>
        <FirestoreImageCollection />
      </form>{" "}
    </Layout.Column>
  );
};

const FirestoreImageCollection = () => {
  const { selectedDate } = useDateStore();
  const user = useCurrentUser();
  const formattedDate = formatDate(selectedDate);
  const journalEntryPath = `users/${user?.uid}/journal-entries/${formattedDate}`;
  const [journalEntry] = useDocumentData<JournalEntry>(
    doc(db, journalEntryPath)
  );

  //delete photo using url? path??

  return (
    <Layout.Column>
      {journalEntry?.photos?.map((photo, index) => {
        return (
          <div>
            <img
              key={`photo-${index}`}
              src={photo.url}
              alt="images"
              width={300}
              height={200}
            />
          </div>
        );
      })}
    </Layout.Column>
  );
};
