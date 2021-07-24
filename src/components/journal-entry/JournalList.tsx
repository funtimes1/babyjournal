import { firestore } from "../../firebase";
import { useJournalEntriesFirestoreRef } from "../hooks/UseUserJournalEntries";
import { useCollection } from "react-firebase-hooks/firestore";
import { JournalEntry } from "../../Types";
import React from "react";

export const JournalList: React.FunctionComponent = () => {
  const journalCollectionRef = useJournalEntriesFirestoreRef();
  const [value, loading, error] = useCollection<JournalEntry>(
    journalCollectionRef,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>Journal Entries</h2>

      {value?.docs.map((doc) => {
        const { photos, ...restOfTheData } = doc.data();
        return (
          <div key={doc.id}>
            Journal {doc.id}: {JSON.stringify(restOfTheData)}
            {/* Here we could have a component called <JournalEntryEvents journalEntryDate={doc.id}/>
              and inside this component, we could fetch all the journal entry events and map over them to list.
              the hook to fetch these should look something like useJournalEntryEvents(date: string) where date is the doc.id from above
             */}
          </div>
        );
      })}
    </div>
  );
};
