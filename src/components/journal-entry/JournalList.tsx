import { useJournalEntries } from "../hooks/UseUserJournalEntries";
import React from "react";
import { x } from "@xstyled/styled-components";
import { JournalEntry } from "../../Types";
import { useJournalEntryEvents } from "../hooks/UseJournalEntryEvents";

export const JournalList: React.FunctionComponent = () => {
  const [value, loading, error] = useJournalEntries(); //useJournalEntries()incorporates the usecollection in one hook
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>Journal Entries</h2>
      {/* shows all entries per day  */}

      {value?.docs.map((doc) => {
        return <JournalEntryRow journalEntry={doc.data()} />;
      })}
    </div>
  );
};

const JournalEntryRow: React.FunctionComponent<{
  journalEntry: JournalEntry;
}> = (props) => {
  const [value, loading, error] = useJournalEntryEvents(props.journalEntry.id);
  return (
    <x.div
      key={props.journalEntry.id}
      display="flex"
      flexDirection="column"
      borderRadius="2xl"
      p={5}
      boxShadow="2xl"
      backgroundColor="green-200"
      m={8}
    >
      <x.span fontSize="sm" color="green-700">
        ------Journal-----: {JSON.stringify(props.journalEntry)}
      </x.span>
      <x.span fontSize="sm" color="green-700">
        {/*//map over events by creating journalentryeventsrow component   */}
        ------Events-----: {JSON.stringify(value?.docs.map((d) => d.data()))}
      </x.span>
    </x.div>
  );
};
