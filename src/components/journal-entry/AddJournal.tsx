import cuid from "cuid";
import { useForm } from "react-hook-form";
import { useJournalEntriesRef } from "../hooks/UseUserJournalEntries";
import { JournalEntry } from "../../Types";
import { format } from "date-fns";
import React from "react";

//use JournalEntry type
//create hook usejournalentries hook

export const AddJournal: React.FunctionComponent = () => {
  const formattedDate = format(new Date(), "yyyy-MM-dd");
  // QUESTION:  can the formattedDate be replaced by setSelectedDate from: const { selectedDate, setSelectedDate } = useDateStore() ??

  const journalCollectionRef = useJournalEntriesRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JournalEntry>({
    defaultValues: {
      notes: "",
      time: Date.now(),
      date: formattedDate,
      photos: [],
    },
  });

  const addJournalEntry = async (value: JournalEntry) => {
    // const { title, notes, events } = value;
    const { notes, time, photos } = value;
    const entry = {
      date: formattedDate,
      notes,
      time,
      photos,
    };
    console.log({ entry });
    console.log(journalCollectionRef.path);

    try {
      await journalCollectionRef.doc(formattedDate).set(entry);
      // await journalCollectionRef
      //   .doc(formattedDate)
      //   .collection("events")
      //   .doc(id)
      //   .set({ ...entry });
      console.log("finished");
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("finally done");
    }
  };
  return (
    <div>
      <h2>Add Journal</h2>

      {/* <h4>Please choose a category</h4> */}
      {/* <select */}
      {/* // {...register("category", { required: "please select a category" })} */}
      {/* > */}
      {/* <option value="">Select a category</option> */}
      {/* {categories.map((category) => (
          <option key={category.name} value={category.display}>
            {category.display}
          </option>
        ))} */}
      {/* </select> */}

      <form onSubmit={handleSubmit(addJournalEntry)}>
        <input
          {...register("notes", { required: "notes is required" })}
          type="text"
          placeholder="Add summary of day here"
          name="notes"
        />
        {errors.notes && <p>{errors.notes.message}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
