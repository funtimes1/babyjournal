//component to add events (to a journal entry): category, notes, photos, etc. PER DAY, the hook should use the date as the "id" displays all events from that day!

//made custom hook to get events from journal entry, fetched it by the journal entry date (dateID: string) (function parameter, determined by ME in firestore database)
//useJournalEntry hook compostable (to be reused and built on)

//TO DO: list the events on the page and then edit

import React from "react";
import cuid from "cuid";
import { useForm } from "react-hook-form";
import { useAddEvents } from "./hooks/UseJournalEntryEvents";
import { Events, JournalEntry } from "../Types";
import { format } from "date-fns";
import { categories } from "../Categories";
import { formatDate } from "../utils/formatDate";
import { useDateStore } from "./useStore";

export function AddJournalEntryEvents() {
  // const journalEventsRef = useJournalEntryEventsRef(journalEntryDate);
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);
  const addEvent = useAddEvents();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Events>({
    defaultValues: {
      notes: "",
      category: "",
      duration: 0,
      id: cuid(),
    },
  });

  const addEvents = async (value: Events) => {
    const { notes, category, duration } = value;
    const id = cuid();
    const entry = {
      category,
      id,
      notes,
      duration,
    };
    addEvent(formattedDate, entry);
    // try {
    //   await journalEventsRef.doc(entry.id).set(entry);
    // } catch (error) {
    //   console.log(error.message);
    // } finally {
    //   console.log("finally done");
    // }
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
          {...register("notes")}
          type="text"
          placeholder="Add notes here"
          name="notes"
        />
        {errors.notes && <p>{errors.notes.message}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
