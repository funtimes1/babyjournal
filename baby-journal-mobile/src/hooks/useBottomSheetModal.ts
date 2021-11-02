import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React from 'react';

export function useBottomSheetModalRef() {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return [bottomSheetModalRef, handlePresentModalPress, handleDismissModalPress] as const;
}

export const SnapPoints = ['90%'];

export type UseBottomSheetProps = ReturnType<typeof useBottomSheetModalRef>;
