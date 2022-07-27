import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import { Layout, Spacer } from "../../theme/Layout.components";
import { formatDate } from "../../utils/formatDate";
import { useCurrentUser } from "../hooks/UseCurrentUser";
import { useJournalEntryEvents } from "../hooks/UseJournalEntryEvents";
import { useDateStore, useEditEventStore } from "../useStore";
import { Event } from "../../Types";
import { EditEvent } from "./EditEvent";

export const EventsList: React.FC = () => {
  const user = useCurrentUser();
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);
  const eventsPath = `users/${user?.uid}/journal-entries/${formattedDate}/events/`;
  const { editingEventID, setEditingEventID } = useEditEventStore();
  const [journalEventsData, loading, error] = useJournalEntryEvents();
  const [currentEvent, setCurrentEvent] = useState<Event>({
    id: "",
    category: "",
    notes: "",
  });

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

  const updateEvent = async (updatedEvent: Event) => {
    console.log("started");
    console.log("currentEvent.id", currentEvent.id);
    const eventRef = doc(db, eventsPath, currentEvent.id);

    try {
      editingEventID;
      setCurrentEvent({
        id: updatedEvent.id,
        category: updatedEvent.category,
        notes: updatedEvent.notes,
      });
      console.log("started");
      await updateDoc(eventRef, {
        notes: updatedEvent.notes,
        category: updatedEvent.category,
        id: updatedEvent.id,
      });
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finished");
    }
  };

  const editEvent = (event: Event) => {
    editingEventID;
    setCurrentEvent(event);
  };

  const eventsList = journalEventsData?.map((e, index) => {
    return (
      <React.Fragment key={e.id}>
        {editingEventID === e.id ? (
          <EditEvent currentEvent={currentEvent} updateEvent={updateEvent} />
        ) : (
          <ul>
            <li>
              <b>Category:</b>
              {e.category} <br></br>
              <b>Notes: </b>
              {e.notes}{" "}
              <button onClick={() => deleteEvent(e.id)}>Delete</button>{" "}
              <button
                onClick={() => {
                  editEvent({
                    id: e.id,
                    category: e.category,
                    notes: e.notes,
                  });
                  setEditingEventID(e.id);
                }}
              >
                Edit{" "}
              </button>
            </li>
            <Spacer.Vertical />
          </ul>
        )}
      </React.Fragment>
    );
  });

  if (loading) {
    return <div>loading journal events...</div>;
  }

  return (
    <Layout.Column>
      <Layout.Row px py radius={10} bg="blue-200">
        <ul>{eventsList}</ul>
      </Layout.Row>
    </Layout.Column>
  );
};
