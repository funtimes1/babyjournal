import cuid from "cuid";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Layout } from "../../theme/Layout.components";
import { Event } from "../../Types";
import { categories } from "../../Categories";

export const EventUpdate: React.FC<{
  toggleEditingOff: () => void;
  currentEvent: Event;
  updateEvent: (updatedEvent: Event) => void;
}> = ({ currentEvent, toggleEditingOff, updateEvent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Event>({
    defaultValues: {
      notes: "",
      category: "",
      duration: 0,
      id: "",
    },
  });

  const [editEvent, setEditEvent] = useState<Event>(currentEvent);

  useEffect(() => {
    setEditEvent(currentEvent);
    console.log("useEffect passes the currentEvent: ", currentEvent);
  }, [currentEvent]);

  const onSubmit = () => {
    // e.preventDefault();
    console.log("onSubmit", { editEvent });
    updateEvent(editEvent);
    setValue("notes", "");
    setValue("category", "");
  };

  //event type???
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEvent({ ...editEvent, [name]: value });
  };

  return (
    <Layout.Column px py radius={10} bg="blue-200">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Layout.Row>
          <h4>Please choose a category</h4>
          <select
            {...register("category", { required: "please select a category" })}
            name="category"
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.name} value={category.display}>
                {category.display}
              </option>
            ))}{" "}
          </select>
        </Layout.Row>
        <input
          {...register("notes")}
          type="text"
          placeholder="Add notes here"
          name="notes"
          onChange={handleChange}
        />{" "}
        <button type="submit">Update</button>
        <button onClick={toggleEditingOff}>Cancel Edit</button>
      </form>{" "}
    </Layout.Column>
  );
};
