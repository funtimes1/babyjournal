import { useCurrentUser } from "../hooks/UseCurrentUser";
import cuid from "cuid";
import { useForm } from "react-hook-form";
import { useUserJournalEntries } from "../hooks/UseUserJournalEntries";
import { JournalEntry } from "../../Types";
import React from "react";

//use JournalEntry type
//create hook usejournalentries hook

export const AddJournal: React.FunctionComponent = () => {
  const journalCollectionRef = useUserJournalEntries();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JournalEntry>();

  const addJournalEntry = (value: JournalEntry) => {
    const { title, notes, events } = value;
    const id = cuid();
    const now = Date.now();
    journalCollectionRef.doc(id).set({
      id,
      date: now,
      title,
      notes,
      events,
    });
  };
  return (
    <div>
      <h2>Add Journal</h2>
      <form onSubmit={handleSubmit(addJournalEntry)}>
        <input
          {...register("title")}
          type="text"
          placeholder="Title of Journal Entry"
          name="title"
        />
      </form>

      <button type="submit">Submit</button>
    </div>
  );
};
