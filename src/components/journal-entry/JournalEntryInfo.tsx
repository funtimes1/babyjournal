import { useForm } from "react-hook-form";
import {
  useAddJournalEntry,
  useJournalEntries,
} from "../hooks/UseUserJournalEntries";
import { JournalEntry } from "../../Types";
import React from "react";
import { formatDate } from "../../utils/formatDate";
import { useDateStore } from "../useStore";

//use JournalEntry type
//create hook usejournalentries hook

export const JournalEntryInfo: React.FunctionComponent<{
  journalData?: JournalEntry;
}> = (props) => {
  const { journalData } = props;
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);
  // const [value, loading, error] = useJournalEntries();
  const addEntry = useAddJournalEntry();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JournalEntry>({
    defaultValues: {
      notes: journalData?.notes ?? "",
      title: journalData?.title ?? "",
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
    addEntry(formattedDate, entry);
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
