import React, { useState } from "react";
import { Layout } from "../theme/Layout.components";
import { eachDayOfInterval, format, getWeek } from "date-fns";

export const CalendarDaysOfWeek: React.FC = () => {
  const result = eachDayOfInterval({
    start: new Date(2022, 0, 16),
    end: new Date(2022, 0, 22),
  });
  const daysOfWeek = result.map((day, index) => {
    console.log("result", format(new Date(day), "EEEEE"));
    return (
      <Layout.Row key={`daysOfWeek-${index}`}>
        {format(new Date(day), "EEEEE")}
      </Layout.Row>
    );
  });
  return (
    <Layout.Row justify="space-around" py={4}>
      {daysOfWeek}
    </Layout.Row>
  );
};
