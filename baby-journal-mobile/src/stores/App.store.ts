import * as Application from 'expo-application';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Updates from 'expo-updates';
import create from 'zustand';
import { combine } from 'zustand/middleware';

const { version, releaseId, revisionId } = Constants.manifest;

export const useAppStore = create(
  combine(
    {
      update: { available: false, downloaded: false },
      reload: Updates.reloadAsync,
      info: {
        version,
        releaseId,
        revisionId,
        constants: Constants,
        application: Application,
        device: Device,
      },
      safeBottom: 0,
    },
    (set) => ({
      initAppUpdate: async () => {
        return Updates.addListener((event) => {
          if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
            set({ update: { downloaded: true, available: true } });
          }
          if (event.type === Updates.UpdateEventType.ERROR) {
            console.info('update error:', event);
          }
        });
      },
      checkForAppUpdate: async () => {
        try {
          if (Constants.isDevice) {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
              set({ update: { downloaded: false, available: true } });
              const updateResult = await Updates.fetchUpdateAsync();
              // // ... notify user of update ...
              if (updateResult.isNew) {
                set({ update: { downloaded: updateResult.isNew, available: true } });
              }
            }
          }
        } catch (e) {
          // handle or log error
          console.info('update error:', e);
        }
      },
      setSafeBottom: (safeBottom: number) => {
        set({ safeBottom });
      },
    }),
  ),
);
