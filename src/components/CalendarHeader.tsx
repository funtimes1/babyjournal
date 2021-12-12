import React, { useState } from "react";
import { x } from "@xstyled/styled-components";
import {
  add,
  addMonths,
  subMonths,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { eachDayOfInterval } from "date-fns/fp";

export const CalendarHeader: React.FC<{
  selectedDate: Date;
  setSelectedDate: (date: Date) => void; //way to define a function to take in a date but there is no return (defined by "void")
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
    <x.div>
      <x.div onClick={onPrevMonthClick}>prev month</x.div>{" "}
      <x.div>{format(selectedDate, "yyyy	MMMM")}</x.div>{" "}
      <x.div onClick={onNextMonthClick}>next month </x.div>
    </x.div>
  );
};

//Questions:
//how to include the calendarweek component so that the months + days change with the onclick next/prevmonth??
//Day of the week comes from date-fns or just styled?
