import create from "zustand";
import { combine } from "zustand/middleware";

export const useDateStore = create(
  combine(
    {
      selectedDate: new Date(),
    },
    (set) => ({
      setSelectedDate: (clickedDate: Date) =>
        set({ selectedDate: clickedDate }),
    })
  )
);
