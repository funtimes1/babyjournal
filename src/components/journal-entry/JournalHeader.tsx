import { format } from "date-fns";
import React from "react";
import { Layout } from "../../theme/Layout.components";
import { formatDate } from "../../utils/formatDate";
import { useJournalEntries } from "../hooks/UseUserJournalEntries";
import { useDateStore } from "../useStore";
import { AddJournal } from "./AddJournal";

export const JournalHeader: React.FC = () => {
  const { selectedDate } = useDateStore();
  const [data] = useJournalEntries(formatDate(selectedDate));
  const stringDate = format(selectedDate, "yyyy-MM-dd");
  const journal = data?.map((journal, index) => {
    if (stringDate == journal.date) {
      return (
        <Layout.Row>
          <li key={`journal-${index}`}>
            Title: {journal.title} <br></br>
            Notes: {journal.notes}
            {/* !!!! or show nothing if there is no content */}
          </li>
        </Layout.Row>
      );
    }
  });
  return (
    <Layout.Column px py radius={10} bg="pink-200">
      <Layout.Row>{`${format(selectedDate, "EEEE, MMMM dd yyyy")}`}</Layout.Row>
      <AddJournal />
      <ul>{journal}</ul>
    </Layout.Column>
  );
};

// add "add journal" button if there is no content ( fields: title, summary of day, photos, events)
//no content: "No entry yet, click add journal to get started!"
// if content: display title, summary of day, photos, list of events
