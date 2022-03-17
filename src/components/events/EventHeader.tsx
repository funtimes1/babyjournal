import cuid from "cuid";
import React from "react";
import { Layout, Spacer } from "../../theme/Layout.components";
import { useJournalEntryEvents } from "../hooks/UseJournalEntryEvents";

export const EventHeader: React.FC = () => {
  const id = cuid();
  const [journalEventsData, loading, error] = useJournalEntryEvents(id);
  if (loading) {
    return <div>loading journal events...</div>;
  }

  const eventsList = journalEventsData?.map((e, index) => {
    return (
      <ul>
        <li key={`eventCategory-${index}`}> {e.category} </li>
        <li> {e.notes} </li>
        <Spacer.Vertical />
      </ul>
    );
  });
  return (
    <Layout.Row px py radius={10} bg="blue-200">
      <ul>{eventsList}</ul>
    </Layout.Row>
  );
};
