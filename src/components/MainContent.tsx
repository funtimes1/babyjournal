import React from "react";
import { Layout, Spacer } from "../theme/Layout.components";
import { AddJournalEntryEvents } from "./events/AddJournalEntryEvents";
import { JournalHeader } from "./journal-entry/JournalHeader";
import { JournalPhoto } from "./journal-entry/JournalPhoto";
import { EventsList } from "./events/EventHeader";

export const MainContent: React.FC = () => {
  return (
    <Layout.Column>
      <JournalHeader />
      <Spacer.Vertical />
      <JournalPhoto />
      <Spacer.Vertical />
      <AddJournalEntryEvents />
      <EventsList />
    </Layout.Column>
  );
};
