import { useForm } from "react-hook-form";
import { useAddJournalEntry } from "../hooks/UseUserJournalEntries";
import { JournalEntry } from "../../Types";
import React from "react";
import { formatDate } from "../../utils/formatDate";
import { useDateStore } from "../useStore";

//use JournalEntry type
//create hook usejournalentries hook

export const AddJournal: React.FunctionComponent = () => {
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);

  // const journalCollectionRef = useJournalEntriesRef();
  const addEntry = useAddJournalEntry();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JournalEntry>({
    defaultValues: {
      notes: "",
      title: "",
      date: formattedDate,
      photos: [],
    },
  });

  const addJournalEntry = async (value: JournalEntry) => {
    const { title, notes, photos } = value;
    const entry = {
      date: formattedDate,
      notes,
      title,
      photos,
    };
    // console.log({ entry });
    addEntry(formattedDate, entry);

    // try {
    //   console.log("starting");
    //   await addDoc(journalCollectionRef, entry);
    //   // await journalCollectionRef.doc(formattedDate).set(entry);
    //   // await journalCollectionRef
    //   //   .doc(formattedDate)
    //   //   .collection("events")
    //   //   .doc(id)
    //   //   .set({ ...entry });
    //   console.log("finished");
    // } catch (error) {
    //   console.log(error.message);
    // } finally {
    //   console.log("finally done");
    // }
  };
  return (
    <div>
      <h2>Add Journal</h2>

      <form onSubmit={handleSubmit(addJournalEntry)}>
        <label>Title: </label>
        <input
          {...register("title")}
          type="text"
          placeholder="e.g Graduation"
          name="title"
        />
        <label>Notes: </label>

        <input
          {...register("notes")}
          type="text"
          placeholder="e.g. Today was a great day"
          name="notes"
        />
        {errors.notes && <p>{errors.notes.message}</p>}

        <button type="submit">Add</button>
      </form>
    </div>
  );
};
