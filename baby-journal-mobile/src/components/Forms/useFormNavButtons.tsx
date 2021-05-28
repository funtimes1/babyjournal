import { HeaderBackButton } from '@react-navigation/elements';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFormikContext } from 'formik';
import React from 'react';
import { Alert, BackHandler, Keyboard } from 'react-native';

import { Button } from '../Button.components';
import { Icon } from '../Icons/Icon';
import { Layout } from '../Layout.components';
import { Spacer } from '../Spacer.components';

type HasDelete = {
  showTrash: true;
  onDelete: () => void;
};

type HasNoDelete = {
  showTrash?: false | undefined;
  onDelete: undefined;
};

export function useFormNavButtons(
  options?: {
    cta?: string;
  } & (HasDelete | HasNoDelete),
) {
  const { showTrash, onDelete, cta } = options ?? { showTrash: false };
  const { handleSubmit, isSubmitting, isValid, dirty, values, setFieldTouched } =
    useFormikContext<object>();
  const { setOptions, goBack } =
    useNavigation<StackNavigationProp<Record<string, object | undefined>>>();

  const handleBack = () => {
    Keyboard.dismiss();
    if (dirty) {
      Alert.alert('Discard changes', `Would you like to discard unsaved changes?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => goBack(), style: 'destructive' },
      ]);
    } else {
      goBack();
    }
    return true;
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return handleBack();
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [dirty]),
  );
  React.useEffect(() => {
    const active = isValid && dirty && !isSubmitting;
    setOptions({
      headerRight: () => (
        <Layout.Row px align>
          <Button.Black
            onPress={() => {
              Keyboard.dismiss();
              active && handleSubmit();
            }}
            inactiveOnPress={() => {
              Keyboard.dismiss();
              Object.keys(values).forEach((k) => {
                setFieldTouched(k, true, true);
              });
            }}
            content={isSubmitting ? 'Loading...' : cta ?? 'Save'}
            active={active}
            py={6}
            px={16}
          />
          {showTrash && (
            <>
              <Spacer.Horizontal size="l-20" />
              <Button.Borderless
                onPress={() => {
                  Keyboard.dismiss();
                  if (onDelete) {
                    onDelete();
                  }
                }}
              >
                <Icon name="trash-outline" size={20} />
              </Button.Borderless>
            </>
          )}
        </Layout.Row>
      ),
      headerLeft: (props) => <HeaderBackButton {...props} onPress={handleBack} />,
    });
  }, [isValid, dirty, isSubmitting]);
}
