import cuid from "cuid";
import { useForm } from "react-hook-form";
import { useJournalEntriesRef } from "../hooks/UseUserJournalEntries";
import { Events } from "../../Types";
import { format } from "date-fns";
import { categories } from "../../Categories";

//use JournalEntry type
//create hook usejournalentries hook

export const AddJournal: React.FunctionComponent = () => {
  const journalCollectionRef = useJournalEntriesRef();
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

  const addJournalEntry = async (value: Events) => {
    // const { title, notes, events } = value;
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
    console.log({ entry });
    console.log(journalCollectionRef.path);
    // journalCollectionRef
    //   .doc(id)
    //   .set(entry)
    //   .then(() => {
    //     console.log("finished");
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   })
    //   .finally(() => {
    //     console.log("finally done");
    //   });
    // this is the same
    //checking to see the errors
    try {
      await journalCollectionRef.doc(formattedDate).set({
        date: formattedDate,
        updatedAt: Date.now(),
        notes: notes,
      });
      await journalCollectionRef
        .doc(formattedDate)
        .collection("events")
        .doc(id)
        .set({ ...entry });
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

      <form onSubmit={handleSubmit(addJournalEntry)}>
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
