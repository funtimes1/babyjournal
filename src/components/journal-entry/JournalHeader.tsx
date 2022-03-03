import { format } from "date-fns";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import { Layout } from "../../theme/Layout.components";
import { JournalEntry } from "../../Types";
import { formatDate } from "../../utils/formatDate";
import { useCurrentUser } from "../hooks/UseCurrentUser";
import { useJournalEntries } from "../hooks/UseUserJournalEntries";
import { useDateStore } from "../useStore";
import { AddJournal } from "./AddJournal";

export const JournalHeader: React.FC = () => {
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);
  const stringDate = format(selectedDate, "yyyy-MM-dd");
  const user = useCurrentUser();
  const journalEntriesPath = `users/${user?.uid}/journal-entries`;
  const [value, loading, error] = useJournalEntries(formattedDate);
  if (loading) {
    return <div>loading...</div>;
  }

  //QUESTION: correct way to delete single fields?

  // const deleteJournal = async (dateId: string) => {
  //   try {
  //     console.log("started");
  //     await deleteDoc(doc(db, journalEntriesPath, dateId));
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     console.log("finished");
  //   }
  // };

  const deleteJournalTitle = async (dateId: string) => {
    try {
      console.log("started");
      await updateDoc(doc(db, journalEntriesPath, dateId), {
        title: deleteField(),
      });
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finished");
    }
  };

  const deleteJournalNotes = async (dateId: string) => {
    try {
      console.log("started");
      await updateDoc(doc(db, journalEntriesPath, dateId), {
        notes: deleteField(),
      });
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finished");
    }
  };
  const journal = value?.map((journal, index) => {
    if (stringDate == journal.date) {
      return (
        <Layout.Row>
          <li key={`journal-${index}`}>
            Title: {journal.title}
            <button
              onClick={() => {
                deleteJournalTitle(formattedDate);
              }}
            >
              {" "}
              Delete{" "}
            </button>
            <br></br>
            Notes: {journal.notes}
            <button
              onClick={() => {
                deleteJournalNotes(formattedDate);
              }}
            >
              {" "}
              Delete{" "}
            </button>
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
