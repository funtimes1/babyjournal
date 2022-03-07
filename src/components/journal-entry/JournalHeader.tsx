import { format } from "date-fns";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import { Layout } from "../../theme/Layout.components";
import { formatDate } from "../../utils/formatDate";
import { useCurrentUser } from "../hooks/UseCurrentUser";
import {
  useJournalEntries,
  useJournalEntry,
} from "../hooks/UseUserJournalEntries";
import { useDateStore } from "../useStore";
import { AddJournal } from "./AddJournal";

export const JournalHeader: React.FC = () => {
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);
  const stringDate = format(selectedDate, "yyyy-MM-dd");
  const user = useCurrentUser();
  const journalEntriesPath = `users/${user?.uid}/journal-entries`;

  const [journalData, loading, error] = useJournalEntry(formattedDate);
  if (loading) {
    return <div>loading...</div>;
  }

  //QUESTIONS:
  // correct way to delete single fields ? deletes in firestore but not on page.
  // editing not working..??
  // how to either show add journal or the title and notes of journal entries AND show edit form upon clicking edit?
  // how to clear form fields once added (blank slate)

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

  const editJournal = async (
    dateId: string,
    title: string | null,
    notes: string | null
  ) => {
    try {
      const newFields = { title: title, notes: notes };
      await updateDoc(doc(db, journalEntriesPath, dateId), newFields);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finished");
    }
  };
  const journal = (
    <Layout.Row>
      Title: {journalData?.title}
      <button
        onClick={() => {
          deleteJournalTitle(formattedDate);
        }}
      >
        Delete{" "}
      </button>
      <br></br>
      Notes: {journalData?.notes}
      <button
        onClick={() => {
          deleteJournalNotes(formattedDate);
        }}
      >
        {" "}
        Delete{" "}
      </button>
      {/* !!!! or show nothing if there is no content */}
      {/* <button onClick={() => editJournal(doc.date, doc.title, doc.notes)}>
            {" "}
           Edit Journal{" "}
          </button> */}
    </Layout.Row>
  );

  return (
    <Layout.Column px py radius={10} bg="pink-200">
      <Layout.Row>{`${format(selectedDate, "EEEE, MMMM dd yyyy")}`}</Layout.Row>
      <AddJournal />
    </Layout.Column>
  );
};

// add "add journal" button if there is no content ( fields: title, summary of day, photos, events)
//no content: "No entry yet, click add journal to get started!"
// if content: display title, summary of day, photos, list of events
