import cuid from "cuid";
import { useForm } from "react-hook-form";
import { useUserJournalEntries } from "../hooks/UseUserJournalEntries";
import { JournalEntry } from "../../Types";

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
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Title of Journal Entry"
          name="title"
        />
        {errors.title && <p>{errors.title.message}</p>}
      </form>

      <button type="submit">Submit</button>
    </div>
  );
};
