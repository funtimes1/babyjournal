import React from "react";
import { Layout, Spacer } from "../theme/Layout.components";
import { AddJournalEntryEvents } from "./events/AddJournalEntryEvents";
import { JournalHeader } from "./journal-entry/JournalHeader";
import { AddJournalPhoto } from "./journal-entry/AddJournalPhoto";
import { EventHeader } from "./events/EventHeader";

export const MainContent: React.FC = () => {
  return (
    <Layout.Column>
      <JournalHeader />
      <Spacer.Vertical />
      <AddJournalPhoto />
      <Spacer.Vertical />
      <AddJournalEntryEvents />
      <EventHeader />
    </Layout.Column>
  );
};
