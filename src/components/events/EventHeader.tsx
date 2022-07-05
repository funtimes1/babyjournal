import cuid from "cuid";
import {
  deleteField,
  doc,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import { Layout, Spacer } from "../../theme/Layout.components";
import { Event } from "../../Types";
import { formatDate } from "../../utils/formatDate";
import { useCurrentUser } from "../hooks/UseCurrentUser";
import { useJournalEntryEvents } from "../hooks/UseJournalEntryEvents";
import { useDateStore } from "../useStore";

export const EventsList: React.FC = () => {
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
  // const deleteEventCategory = async (id: string) => {
  //   try {
  //     console.log("started");
  //     await updateDoc(doc(db, eventsPath, id), {
  //       category: deleteField(),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     console.log("finished");
  //   }
  // };
  const eventsList = journalEventsData?.map((e, index) => {
    return (
      <ul key={e.id}>
        {/* <li key={`eventCategory-${index}`}>{e.id} </li> */}
        <li>
          {" "}
          <b>Category:</b>
          {e.category} <br></br>
          {e.notes}
          <button onClick={() => deleteEvent(e.id)}>Delete</button>{" "}
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
