import create from 'zustand';
import { combine } from 'zustand/middleware';

import { neverInProd } from '../lib/Platform/neverInProd';

export const useDebugStore = create(
  combine(
    {
      debugBorders: false,
      debugFormValues: false,
      debugShowUpdateBanner: false,
      debugShowDebugButton: __DEV__,
    },
    (set, get) => ({
      toggleDebugBorders: () => {
        set({ debugBorders: !get().debugBorders });
      },
      toggleDebugFormValues: () => {
        set({ debugFormValues: !get().debugFormValues });
      },
      toggleShowUpdateBanner: () => {
        set({ debugShowUpdateBanner: !get().debugShowUpdateBanner });
      },
      toggleShowDebugButton: () => {
        set({ debugShowDebugButton: !get().debugShowDebugButton });
      },
      safeDebugBorders: () => {
        return neverInProd(get().debugBorders);
      },
      safeDebugFormValues: () => {
        return neverInProd(get().debugFormValues);
      },
      safeDebugShowUpdateBanner: () => {
        return neverInProd(get().debugShowUpdateBanner);
      },
      safeDebugShowDebugButton: () => {
        return neverInProd(get().debugShowDebugButton);
      },
    }),
  ),
);
