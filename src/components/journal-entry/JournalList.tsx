import { firestore } from "../../firebase";
import { useUserJournalEntries } from "../hooks/UseUserJournalEntries";
import { useCollection } from "react-firebase-hooks/firestore";
import { JournalEntry } from "../../Types";
import React from "react";

export const JournalList: React.FunctionComponent = () => {
  const journalCollectionRef = useUserJournalEntries();
  const [value, loading, error] = useCollection<JournalEntry>(
    journalCollectionRef,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>Journal Entries</h2>

      {value?.docs.map((doc) => {
        const { title } = doc.data();
        return <div key={doc.id}>Title: {title}</div>;
      })}
    </div>
  );
};
