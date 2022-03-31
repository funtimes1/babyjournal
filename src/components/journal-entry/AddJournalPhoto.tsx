import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { uploadFile } from "../../databaseFirestore/uploadFile";
import { Layout } from "../../theme/Layout.components";
import { Photo } from "../../Types";
import { formatDate } from "../../utils/formatDate";
import { useCurrentUser } from "../hooks/UseCurrentUser";
import { useDateStore } from "../useStore";

//adds and displays photos
export const AddJournalPhoto: React.FC = () => {
  const { selectedDate } = useDateStore();
  const [error, setError] = useState(null);
  const user = useCurrentUser();
  const formattedDate = formatDate(selectedDate);
  const journalEntriesPath = `users/${user?.uid}/journal-entries`;
  // const addPhoto = uploadFile();
  const types = ["image/png", "image/jpeg"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Photo>({
    defaultValues: {
      url: "",
      caption: "",
    },
  });

  const onSubmit = async (value: Photo, data) => {
    const { url, caption } = value;
    const selectedFile = data.image[0];
    const photo = {
      url,
      caption,
    };
    await uploadFile(selectedFile, photo);
  };

  return (
    <Layout.Column px py radius={10} bg="pink-200">
      Add photo
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("url")} type="file" name="image" />
        <input {...register("caption")} type="text" name="caption" />
        <button>Submit</button>
      </form>
    </Layout.Column>
  );
};
//click on upload file
//choose photo in the correct format
//save photo to the journal entry object in photos array (Save OR update photos array??)
//update the photos array
//display photos
