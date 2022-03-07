import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Layout } from "../../theme/Layout.components";
import { JournalEntry } from "../../Types";
import { formatDate } from "../../utils/formatDate";
import { useDateStore } from "../useStore";

//"void" in typescript indicates return type of functions that do not return a value
//for example callback functions ^
export const EditJournal: React.FC<{
  currentJournal: JournalEntry;
  updateJournal: (updateJournal: JournalEntry) => void;
}> = ({ currentJournal, updateJournal }) => {
  const [editJournal, setEditJournal] = useState<JournalEntry>(currentJournal);
  const { selectedDate } = useDateStore();
  const formattedDate = formatDate(selectedDate);

  //useEffect makes a copy of the value of the currentJournal into the editJournal

  useEffect(() => {
    setEditJournal(editJournal);
    console.log("useEffect passes the editJournal", editJournal);
  }, [currentJournal]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateJournal(editJournal);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditJournal({ ...editJournal, [name]: value, date: formattedDate });
  };

  const { title, notes } = editJournal;

  return (
    <Layout.Row>
      <p> Edit Journal</p>

      <form onSubmit={onSubmit}>
        <br></br>
        Title
        <input type="text" name="title" value={title} onChange={onChange} />
        <button>Update</button>
      </form>
    </Layout.Row>
  );
};
