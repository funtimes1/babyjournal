//component to add events (to a journal entry): category, notes, photos, etc. PER DAY, the hook should use the date as the "id" displays all events from that day!

//made custom hook to get events from journal entry, fetched it by the journal entry date (dateID: string) (function parameter, determined by ME in firestore database)
//useJournalEntry hook compostable (to be reused and built on)

//TO DO: list the events on the page and then edit

import cuid from "cuid";
import { useForm } from "react-hook-form";
import { Event } from "../../Types";
import { categories } from "../../Categories";
import { formatDate } from "../../utils/formatDate";
import { useDateStore } from "../useStore";
import { Layout } from "../../theme/Layout.components";
import { useAddEvent } from "../../databaseFirestore/useAddEvent";

export function AddJournalEntryEvents() {
  // const journalEventsRef = useJournalEntryEventsRef(journalEntryDate);
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);
  const addEvent = useAddEvent();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<Event>({
    defaultValues: {
      notes: "",
      category: "",
      duration: 0,
      id: cuid(),
    },
    mode: "onChange",
  });

  const onSubmit = async (value: Event) => {
    const { notes, category, duration } = value;
    const id = cuid();
    const event = {
      category,
      id,
      notes,
      duration,
    };
    addEvent(formattedDate, event);
    setValue("notes", "");
    setValue("category", "");
  };

  return (
    <Layout.Column px py radius={10} bg="pink-200">
      <h2>Add Event</h2>
      <Layout.Row>
        <h4>Please choose a category</h4>
        <select
          {...register("category", { required: "please select a category" })}
        >
          {/* <option value="">Select a category</option> */}
          {categories.map((category) => (
            <option key={category.name} value={category.display}>
              {category.display}
            </option>
          ))}{" "}
        </select>
      </Layout.Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("notes")}
          type="text"
          placeholder="Add notes here"
          name="notes"
        />
        {errors.notes && <p>{errors.notes.message}</p>}

        <button disabled={!isDirty || !isValid} type="submit">
          Submit
        </button>
      </form>
    </Layout.Column>
  );
}
