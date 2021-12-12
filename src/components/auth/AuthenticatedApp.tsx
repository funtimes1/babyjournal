import { useCurrentUser } from "../hooks/UseCurrentUser";
import React from "react";
import { format } from "date-fns";
import { AppLayout } from "../AppLayout";
import { AddJournal } from "../journal-entry/AddJournal";
import { JournalList } from "../journal-entry/JournalList";
import { JournalEntryEvents } from "../JournalEntryEvents";

//User information such as ID contained in and accessible via Authenticated App
// TODO: move this into its own file
export const AuthenticatedApp: React.FC = () => {
  const user = useCurrentUser();
  const formattedDate = format(new Date(), "yyyy-MM-dd");
  return (
    <>
      <AppLayout />
      {/* JSON stringify converts object or value to a JSON string */}
      {/* <AddJournal />
      <JournalEntryEvents journalEntryDate={formattedDate} />
      <JournalList /> */}
      {/* {JSON.stringify(user, null, 2)} */}
    </>
  );
};
