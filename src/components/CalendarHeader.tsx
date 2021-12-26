import React, { useState } from "react";
import { x } from "@xstyled/styled-components";
import { addMonths, subMonths, format, startOfMonth } from "date-fns";
import { Circle, Layout } from "../theme/Layout.components";

export const CalendarHeader: React.FC<{
  selectedDate: Date;
  setSelectedDate: (date: Date) => void; //way to define a function that takes in a date without a return (defined by "void")
}> = (props) => {
  const { selectedDate, setSelectedDate } = props;
  const startMonth = startOfMonth(selectedDate);

  const onNextMonthClick = () => {
    const nextMonth = addMonths(new Date(startMonth), 1);
    setSelectedDate(nextMonth);
  };

  const onPrevMonthClick = () => {
    const prevMonth = subMonths(new Date(startMonth), 1);
    setSelectedDate(prevMonth);
  };
  return (
    <Layout.Row center>
      <Layout.Column onClick={onPrevMonthClick} px py>
        prev month
      </Layout.Column>{" "}
      <Layout.Column px py>
        {format(selectedDate, "MMMM yyyy")}
      </Layout.Column>{" "}
      <Layout.Column px py center onClick={onNextMonthClick}>
        next month{" "}
      </Layout.Column>
    </Layout.Row>
  );
};
