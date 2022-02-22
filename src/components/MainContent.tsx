import React from "react";
import { Layout, Spacer } from "../theme/Layout.components";
import { formatDate } from "../utils/formatDate";
import { useJournalEntryEvents } from "./hooks/UseJournalEntryEvents";
import { AddJournalEntryEvents } from "./AddJournalEntryEvents";
import { useDateStore } from "./useStore";
import { JournalHeader } from "./journal-entry/JournalHeader";
import { JournalPhoto } from "./journal-entry/JournalPhoto";

export const MainContent: React.FC = () => {
  const { selectedDate } = useDateStore();
  const [data] = useJournalEntryEvents(formatDate(selectedDate));
  console.log("data!", [data]);

  return (
    <Layout.Column>
      <JournalHeader />
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
