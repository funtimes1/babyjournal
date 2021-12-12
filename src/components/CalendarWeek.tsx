import React, { useState } from "react";
import { x } from "@xstyled/styled-components";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export const CalendarWeek: React.FC = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const startMonth = startOfMonth(selectedDate);
  const endMonth = endOfMonth(selectedDate);
  const currentMonth = eachDayOfInterval({
    start: startMonth,
    end: endMonth,
  });
  const weekStartOfMonth = startOfWeek(startMonth);
  const weekEndOfMonth = endOfWeek(endMonth);
  const currentMonthWithPaddingDays = eachDayOfInterval({
    start: weekStartOfMonth,
    end: weekEndOfMonth,
  });
  const sunday = eachWeekOfInterval({
    start: weekStartOfMonth,
    end: weekEndOfMonth,
  });

  const Circle: React.FC = (props) => {
    const { children } = props;
    return (
      <x.div
        backgroundColor="orange-200"
        h={10}
        w={10}
        border={1}
        borderRadius={20}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </x.div>
    );
  };

  return (
    <x.div>
      {" "}
      {sunday.map((day, index) => {
        // const onClick = () => {
        //   console.log("hello", day);
        // };
        const startWeek = startOfWeek(day);
        const endWeek = endOfWeek(day);
        const currentWeek = eachDayOfInterval({
          start: startWeek,
          end: endWeek,
        });
        console.log("currentweek", currentWeek);

        const week = currentWeek.map((date, index) => {
          console.log("day of currentweek", date.getDate(), date.getDay());
          return (
            <x.div
              key={index}
              className="week"
              display="flex"
              flex-direction="column"
            >
              <Circle>{date.getDate()}</Circle>
            </x.div>
          );
        });

        return (
          <x.div
            key={`weekday-${index}`}
            display="flex"
            flex-direction="row"
            //onClick={onClick}
          >
            {week}
          </x.div>
        );
      })}
    </x.div>
  );
};
