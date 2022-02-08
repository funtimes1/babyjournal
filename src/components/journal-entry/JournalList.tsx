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

  //Questions:

  return (
    <div>
      <h2>Journal Entries</h2>

      {value?.map((doc) => {
        return <JournalEntryRow key={doc.date} journalEntry={doc} />;
      })}
    </div>
  );
};

const JournalEntryRow: React.FC<{
  journalEntry: JournalEntry;
}> = (props) => {
  const [value, loading, error] = useJournalEntryEvents(
    props.journalEntry.date
  );
  return (
    <div>
      <x.div
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
      </x.div>
      <x.div
        display="flex"
        flexDirection="column"
        borderRadius="2xl"
        p={5}
        boxShadow="2xl"
        backgroundColor="green-200"
        m={8}
      >
        {/*//map over events by creating journalentryeventsrow component   */}

        {value?.map((event) => {
          return (
            <x.span fontSize="sm" color="green-700">
              ------Events-----: {event.category}
              {event.notes}
              {event.duration}
            </x.span>
          );
        })}
      </x.div>
    </div>
  );
};
