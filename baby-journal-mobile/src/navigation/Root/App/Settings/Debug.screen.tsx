import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Switch, Clipboard } from 'react-native';
import { currentUser, logout } from '../../../../backend/Auth.backend';

import { ActionRow } from '../../../../components/ActionRow.component';
import { DebugInfoContainer } from '../../../../components/DebugInfoContainer.component';
import { Layout } from '../../../../components/Layout.components';
import { Separator } from '../../../../components/Separator.components';
import { Spacer } from '../../../../components/Spacer.components';
import { Mono, OpenSans } from '../../../../components/Typography.components';
import { deleteAllImages } from '../../../../lib/Images';
import { useAppStore } from '../../../../stores/App.store';
import { useDebugStore } from '../../../../stores/Debug.store';
import { styled } from '../../../../theme/theme';
import { useNav } from '../../../useNav';

const DebugActionRow = styled(ActionRow).attrs({
  color: 'inverse',
  layout: {
    px: 2,
    py: 10,
  },
})``;

export const DebugScreen: React.FC = () => {
  const { info } = useAppStore();
  const {
    toggleDebugBorders,
    debugBorders,
    toggleDebugFormValues,
    debugFormValues,
    toggleShowUpdateBanner,
    debugShowUpdateBanner,
    toggleShowDebugButton,
    debugShowDebugButton,
  } = useDebugStore();

  const { popToTop } = useNav<'Debug'>();
  const { application, device, constants, ...rest } = info;

  const [asyncStorageValues, setAsyncStorageValues] = React.useState<[string, string | null][]>([]);
  React.useEffect(() => {
    const getAsyncStorageValues = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      setAsyncStorageValues(values);
    };
    getAsyncStorageValues();
  }, []);

  const snapPoints = React.useMemo(() => ['90%'], []);

  const asyncStorageSheetRef = React.useRef<BottomSheetModal>(null);
  const presentAsyncStorageSheet = React.useCallback(() => {
    asyncStorageSheetRef.current?.present();
  }, []);

  return (
    <Layout.Scroll>
      <StatusBar style="dark" />
      <Layout.Column px="xs-12" py="xs-12">
        <DebugInfoContainer>
          <DebugActionRow onPress={toggleDebugBorders} showChevron={false}>
            <OpenSans.Inverse grow>Toggle Visual Debugger</OpenSans.Inverse>
            <Switch value={debugBorders} onValueChange={toggleDebugBorders} />
          </DebugActionRow>
          <Separator.Horizontal />
          <DebugActionRow onPress={toggleDebugFormValues} showChevron={false}>
            <OpenSans.Inverse grow>Toggle Form Debugger</OpenSans.Inverse>
            <Switch value={debugFormValues} onValueChange={toggleDebugFormValues} />
          </DebugActionRow>
          <Separator.Horizontal />
          <DebugActionRow onPress={toggleShowUpdateBanner} showChevron={false}>
            <OpenSans.Inverse grow>Toggle Update Banner</OpenSans.Inverse>
            <Switch value={debugShowUpdateBanner} onValueChange={toggleShowUpdateBanner} />
          </DebugActionRow>
          <Separator.Horizontal />
          <DebugActionRow onPress={toggleShowDebugButton} showChevron={false}>
            <OpenSans.Inverse grow>Toggle Floating Debug Button</OpenSans.Inverse>
            <Switch value={debugShowDebugButton} onValueChange={toggleShowDebugButton} />
          </DebugActionRow>
          <Separator.Horizontal />
          <DebugActionRow onPress={presentAsyncStorageSheet}>
            <OpenSans.Inverse grow>Show Async Storage</OpenSans.Inverse>
            <BottomSheetModal
              ref={asyncStorageSheetRef}
              index={0}
              snapPoints={snapPoints}
              backdropComponent={BottomSheetBackdrop}
            >
              <BottomSheetScrollView>
                <Layout.Column px py>
                  <DebugInfoContainer title="Async Storage" content={asyncStorageValues} />
                </Layout.Column>
              </BottomSheetScrollView>
            </BottomSheetModal>
          </DebugActionRow>
          <Separator.Horizontal />
          <DebugActionRow
            onPress={() => {
              popToTop();
              deleteAllImages();
              logout();
            }}
          >
            <OpenSans.Inverse grow>Logout</OpenSans.Inverse>
          </DebugActionRow>
        </DebugInfoContainer>
        <Spacer.Vertical />
        <DebugInfoContainer>
          <Layout.PressableColumn
            onPress={() => {
              const dataUrl = `https://console.firebase.google.com/project/${
                constants.manifest?.extra?.firebase.projectId
              }/firestore/data~2FuserData~2F${currentUser()?.uid}`;
              Clipboard.setString(dataUrl);
              console.info(dataUrl);
            }}
          >
            <OpenSans.Inverse>Copy Firestore Data Path:</OpenSans.Inverse>
            <Mono.Inverse size="xs-12">{`users/${currentUser()?.uid ?? 'none'}`}</Mono.Inverse>
          </Layout.PressableColumn>
        </DebugInfoContainer>
        <Spacer.Vertical />
        <DebugInfoContainer title="Version Info" content={rest} />
        <Spacer.Vertical />
        <DebugInfoContainer title="Application" content={application} />
        <Spacer.Vertical />
        <DebugInfoContainer title="Device" content={device} />
        <Spacer.Vertical />
        <DebugInfoContainer title="Constants" content={constants} />
      </Layout.Column>
    </Layout.Scroll>
  );
};
