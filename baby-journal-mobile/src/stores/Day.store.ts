import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useDayStore = create(
  combine(
    {
      selectedDay: new Date(),
    },
    (set) => ({
      setSelectedDay: (selectedDay: Date) => {
        set({ selectedDay });
      },
    }),
  ),
);
