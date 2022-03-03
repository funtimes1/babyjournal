import React, { useState } from "react";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  isSameMonth,
} from "date-fns";
import { useDateStore } from "../useStore";
import { Layout, Circle } from "../../theme/Layout.components";

export const CalendarWeeks: React.FC = () => {
  const { selectedDate, setSelectedDate } = useDateStore();
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

  return (
    <Layout.Column>
      {sunday.map((day, index) => {
        const startWeek = startOfWeek(day);
        const endWeek = endOfWeek(day);
        const currentWeek = eachDayOfInterval({
          start: startWeek,
          end: endWeek,
        });
        // console.log("currentweek", currentWeek);

        const week = currentWeek.map((date, index) => {
          const onClick = () => {
            // console.log("hello", date);
            setSelectedDate(date);
          };

          // console.log(
          //   "day of currentweek",
          //   date.getDate(),
          //   format(new Date(date), "EEEEEE")
          // );

          const isMonthDay = isSameMonth(date, selectedDate);

          return (
            <Layout.Row>
              <Circle
                key={`calendarDate-${index}`}
                circleSize={40}
                bg={isMonthDay ? "green-300" : "cyan-100"}
                center
                onClick={onClick}
              >
                {date.getDate()}
              </Circle>
            </Layout.Row>
          );
        });

        return (
          <Layout.Row key={`weekday-${index}`} justify="space-around" py={4}>
            {week}
          </Layout.Row>
        );
      })}
    </Layout.Column>
  );
};

// const Circle: React.FC = (props) => {
//   const { children } = props;
//   return (
//     <Layout.Column
//       style={{ height: 40, width: 40 }}
//       radius={20}
//       center
//       border={[1, "solid", "black"]}
//       bg="cyan-300"
//     >
//       {children}
//     </Layout.Column>
//   );
// };
