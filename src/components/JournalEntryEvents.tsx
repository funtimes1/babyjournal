//component to add events (to a journal entry): category, notes, photos, etc. PER DAY, the hook should use the date as the "id" displays all events from that day!

//made custom hook to get events from journal entry, fetched it by the journal entry date (dateID: string) (function parameter, determined by ME in firestore database)
//useJournalEntry hook compostable (to be reused and built on)

//TO DO: list the events on the page and then edit

import React from "react";
import cuid from "cuid";
import { useForm } from "react-hook-form";
import { useJournalEntryEventsRef } from "./hooks/UseJournalEntryEvents";
import { Events } from "../Types";
import { format } from "date-fns";
import { categories } from "../Categories";

export const JournalEntryEvents: React.FunctionComponent<{
  journalEntryDate: string;
}> = ({ journalEntryDate }) => {
  const journalEventsRef = useJournalEntryEventsRef(journalEntryDate);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Events>({
    defaultValues: {
      notes: "",
      category: "",
      duration: 0,
      time: Date.now(),
      id: cuid(),
    },
  });

  const addEvents = async (value: Events) => {
    const { notes, category, duration, time } = value;
    const formattedDate = format(new Date(), "yyyy-MM-dd");
    const id = cuid();
    const entry = {
      category,
      id,
      notes,
      duration,
      time,
    };
    try {
      await journalEventsRef.doc(formattedDate).set({
        date: formattedDate,
        updatedAt: Date.now(),
        notes: notes,
      });
      await journalEventsRef
        .doc(formattedDate)
        .collection("events")
        .doc(id)
        .set({ ...entry });
      // .set({
      //   date: formattedDate,
      //   updatedAt: Date.now(),
      //   notes: notes,
      //   category: category,
      //   duration: duration,
      //   time: time,
      // });
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("finally done");
    }
  };

  return (
    <div>
      <h2>Add Event</h2>
      <h4>Please choose a category</h4>
      <select
        {...register("category", { required: "please select a category" })}
      >
        {/* <option value="">Select a category</option> */}
        {categories.map((category) => (
          <option key={category.name} value={category.display}>
            {category.display}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit(addEvents)}>
        <input
          {...register("notes", { required: "notes is required" })}
          type="text"
          placeholder="Add notes here"
          name="notes"
        />
        {errors.notes && <p>{errors.notes.message}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
