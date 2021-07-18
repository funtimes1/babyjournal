import cuid from "cuid";
import { useForm } from "react-hook-form";
import { useJournalEntriesFirestoreRef } from "../hooks/UseUserJournalEntries";
import { JournalEntry } from "../../Types";
import { format } from "date-fns";

//use JournalEntry type
//create hook usejournalentries hook

export const AddJournal: React.FunctionComponent = () => {
  const journalCollectionRef = useJournalEntriesFirestoreRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JournalEntry>({
    defaultValues: {
      title: "",
      notes: "",
    },
  });

  const addJournalEntry = async (value: JournalEntry) => {
    // const { title, notes, events } = value;
    const { title, notes } = value;

    const formattedDate = format(new Date(), "yyyy-MM-dd");
    const id = cuid();
    const now = Date.now();
    const entry = {
      id,
      date: now,
      title,
      notes,
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
      <form onSubmit={handleSubmit(addJournalEntry)}>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Title of Journal Entry"
          name="title"
        />
        {errors.title && <p>{errors.title.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
