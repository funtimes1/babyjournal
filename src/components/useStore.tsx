import create from "zustand";
import { Layout } from "../theme/Layout.components";
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
