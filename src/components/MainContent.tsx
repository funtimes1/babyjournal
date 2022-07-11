import React, { useState } from "react";
import { Layout, Spacer } from "../theme/Layout.components";
import { AddJournalEntryEvents } from "./events/AddJournalEntryEvents";
import { JournalHeader } from "./journal-entry/JournalHeader";
import { JournalPhoto } from "./journal-entry/JournalPhoto";
import { EventsList } from "./events/EventsList";
import { Event } from "../Types";
import { EventUpdate } from "./events/EventUpdate";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { formatDate } from "../utils/formatDate";
import { useCurrentUser } from "./hooks/UseCurrentUser";
import { useDateStore } from "./useStore";
import cuid from "cuid";

export const MainContent: React.FC = () => {
  const user = useCurrentUser();
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);
  const eventsPath = `users/${user?.uid}/journal-entries/${formattedDate}/events/`;

  //editing mode
  //move to global
  const [editing, setEditing] = useState(false);

  const [currentEvent, setCurrentEvent] = useState<Event>({
    id: "",
    category: "",
    notes: "",
  });
  const updateEvent = async (updatedEvent: Event) => {
    console.log("started");
    console.log("currentEvent.id", currentEvent.id);
    const eventRef = doc(db, eventsPath, currentEvent.id);

    try {
      setEditing(true);
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
    setEditing(true);
    setCurrentEvent(event);
  };

  return (
    <Layout.Column>
      <JournalHeader />
      <Spacer.Vertical />
      <JournalPhoto />
      <Spacer.Vertical />
      {/* hide events list when in editing mode */}
      <EventsList editEvent={editEvent} />

      {editing ? (
        <EventUpdate
          toggleEditingOff={() => setEditing(false)}
          currentEvent={currentEvent}
          updateEvent={updateEvent}
        />
      ) : (
        <AddJournalEntryEvents />
      )}
    </Layout.Column>
  );
};
