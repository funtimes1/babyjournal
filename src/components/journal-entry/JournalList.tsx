import { firestore } from "../../firebase";
import { useJournalEntriesFirestoreRef } from "../hooks/UseUserJournalEntries";
import { useCollection } from "react-firebase-hooks/firestore";
import { Events } from "../../Types";
import React from "react";

export const JournalList: React.FunctionComponent = () => {
  const journalCollectionRef = useJournalEntriesFirestoreRef();
  const [value, loading, error] = useCollection<Events>(journalCollectionRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>Journal Entries</h2>

      {value?.docs.map((doc) => {
        const { notes } = doc.data();
        return <div key={doc.id}>Notes: {notes}</div>;
      })}
    </div>
  );
};
