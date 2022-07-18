import { format } from "date-fns";
import React from "react";
import { Layout } from "../../theme/Layout.components";
import { formatDate } from "../../utils/formatDate";
import { useJournalEntry } from "../hooks/UseUserJournalEntries";
import { useDateStore } from "../useStore";
import { JournalEntryInfo } from "./JournalEntryInfo";

export const JournalHeader: React.FC = () => {
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);

  const [journalData, loading, error] = useJournalEntry(formattedDate);
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Layout.Column px py radius={10} bg="pink-200">
      <Layout.Row>{`${format(selectedDate, "EEEE, MMMM dd yyyy")}`}</Layout.Row>
      <JournalEntryInfo journalData={journalData} />
    </Layout.Column>
  );
};
