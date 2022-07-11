import { doc, deleteDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import { Layout, Spacer } from "../../theme/Layout.components";
import { formatDate } from "../../utils/formatDate";
import { useCurrentUser } from "../hooks/UseCurrentUser";
import { useJournalEntryEvents } from "../hooks/UseJournalEntryEvents";
import { useDateStore } from "../useStore";
import { Event } from "../../Types";

//editEvent doesn't return anything therefore void
export const EventsList: React.FC<{ editEvent: (event: Event) => void }> = ({
  editEvent,
}) => {
  const user = useCurrentUser();
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);
  const eventsPath = `users/${user?.uid}/journal-entries/${formattedDate}/events/`;

  const [journalEventsData, loading, error] = useJournalEntryEvents();
  if (loading) {
    return <div>loading journal events...</div>;
  }

  const deleteEvent = async (id: string) => {
    try {
      const eventRef = doc(db, eventsPath, id);
      console.log("started");
      await deleteDoc(eventRef);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finished");
    }
  };

  const eventsList = journalEventsData?.map((e, index) => {
    return (
      <ul key={e.id}>
        {/* <li key={`eventCategory-${index}`}>{e.id} </li> */}
        <li>
          {" "}
          {/* <b>Event id</b>
          {e.id} */}
          <b>Category:</b>
          {e.category} <br></br>
          <b>Notes: </b>
          {e.notes}
          <button onClick={() => deleteEvent(e.id)}>Delete</button>{" "}
          <button
            onClick={() =>
              editEvent({
                id: e.id,
                notes: e.notes,
                category: e.category,
              })
            }
          >
            Edit
          </button>{" "}
        </li>
        <Spacer.Vertical />
      </ul>
    );
  });

  return (
    <Layout.Row px py radius={10} bg="blue-200">
      <ul>{eventsList}</ul>
      {/* <ul>{JSON.stringify(journalEventsData)}</ul> */}
    </Layout.Row>
  );
};
