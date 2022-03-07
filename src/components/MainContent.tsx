import React, { useState } from "react";
import { Layout, Spacer } from "../theme/Layout.components";
import { formatDate } from "../utils/formatDate";
import { useJournalEntryEvents } from "./hooks/UseJournalEntryEvents";
import { AddJournalEntryEvents } from "./events/AddJournalEntryEvents";
import { useDateStore } from "./useStore";
import { JournalHeader } from "./journal-entry/JournalHeader";
import { JournalPhoto } from "./journal-entry/JournalPhoto";
import { JournalEntry } from "../Types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCurrentUser } from "./hooks/UseCurrentUser";
import {
  useJournalEntries,
  useJournalEntriesRef,
} from "./hooks/UseUserJournalEntries";
import { EditJournal } from "./journal-entry/EditJournal";

export const MainContent: React.FC = () => {
  const { selectedDate } = useDateStore();
  const [data] = useJournalEntryEvents(formatDate(selectedDate));

  const formattedDate = formatDate(selectedDate);

  const journalCollectionRef = useJournalEntries(formattedDate);

  const [currentJournal, setCurrentJournal] = useState<JournalEntry>({
    title: "",
    notes: "",
    date: formattedDate,
    photos: [],
  });
  const updateJournal = (updatedJournal: JournalEntry) => {
    journalCollectionRef.doc(currentJournal.date).update(updatedJournal);
  };

  const editJournal = (journal: JournalEntry) => {
    setCurrentJournal(journal);
  };

  return (
    <Layout.Column>
      <JournalHeader />
      {/* <JournalHeader editJournal={editJournal} /> */}

      {/* <EditJournal
        currentJournal={currentJournal}
        updateJournal={updateJournal}
      /> */}
      <Spacer.Vertical />
      <JournalPhoto />
      <Spacer.Vertical />
      <Layout.Column px py radius={10} bg="pink-200">
        <AddJournalEntryEvents />
        <ul>
          {data?.map((e, index) => (
            <li key={`eventCategory-${index}`}>
              {e.category} <br></br>
              {e.notes}
            </li>
          ))}
        </ul>
      </Layout.Column>
    </Layout.Column>
  );
};
