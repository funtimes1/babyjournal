import cuid from "cuid";
import { useForm } from "react-hook-form";
import { useJournalEntryEventsRef } from "./hooks/UseJournalEntryEvents";
import { Events } from "../Types";
import { format } from "date-fns";
import { categories } from "../Categories";

export const AddEvents: React.FunctionComponent<{
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
        category: category,
        duration: duration,
        time: time,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("finally done");
    }
  };

  return (
    <div>
      <h2>Add Event</h2>
    </div>
  );
};
