import React from 'react';
import { Alert, Image } from 'react-native';
import { Icon } from './Icons/Icon';
import { Layout } from './Layout.components';
import { Spacer } from './Spacer.components';
import { OpenSans } from './Typography.components';
import * as ImagePicker from 'expo-image-picker';
import { PickerProps } from './Forms/Fields/props';
import { useUploadImage } from '../database/journalEntry.database';
import { Circle } from './Shape.components';
import { LoadingIndicator } from './Loading.component';

const image_width = 250;

export const PhotoPicker: React.FC<PickerProps<string>> = (props) => {
  const { value, onSelect } = props;
  const [image, setImage] = React.useState<string | undefined>(value);
  const [dimensions, setDimensions] = React.useState({ h: 0, w: 0 });
  const [uploadImage, uploading, progress] = useUploadImage();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      launchEditor(result.uri);
      setDimensions({ h: result.height, w: result.width });
    }
  };

  const takeImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      launchEditor(result.uri);
      setDimensions({ h: result.height, w: result.width });
    }
  };

  const launchEditor = (uri: string) => {
    // Then set the image uri
    setImage(uri);
    onSelect(uri);
    // And set the image editor to be visible
    // setEditorVisible(true);
  };

  const aspect = dimensions.h / dimensions.w;

  console.log({ dimensions, aspect });

  return (
    <>
      <Layout.Row bg="navBackground" px py radius>
        {image && !isNaN(aspect) ? (
          <Layout.Column center grow>
            <Layout.Column radius style={{ overflow: 'hidden' }}>
              <Image
                source={{ uri: image }}
                style={{ width: image_width, height: image_width * aspect }}
                resizeMode="contain"
              />
              <Layout.PressableColumn
                absolute={{ right: 8, top: 8 }}
                onPress={async () => {
                  const uri = await uploadImage(image);
                  setImage(uri);
                  onSelect(uri);
                }}
              >
                <Circle circleSize={40} bg="haze" center>
                  {uploading ? (
                    <LoadingIndicator />
                  ) : (
                    <Icon
                      name="cloud"
                      size={28}
                      iconColor={progress < 100 ? 'placeholder' : 'success'}
                    />
                  )}
                </Circle>
              </Layout.PressableColumn>
              <Layout.PressableColumn
                absolute={{ left: 8, top: 8 }}
                onPress={() => {
                  setImage(undefined);
                }}
              >
                <Circle circleSize={40} bg="haze" center>
                  <Icon name="trash-bin-outline" size={28} iconColor="destructive" />
                </Circle>
              </Layout.PressableColumn>
            </Layout.Column>
          </Layout.Column>
        ) : (
          <>
            <Layout.PressableColumn
              onPress={takeImage}
              grow
              center
              radius
              bg="inverse"
              border={[1, 'dashed', 'primary']}
              py="xs-12"
            >
              <Icon name="camera-outline" size={28} iconColor="primary" />
              <Spacer.Vertical />
              <OpenSans.Primary size="s-16">Take Photo</OpenSans.Primary>
            </Layout.PressableColumn>
            <Spacer.Horizontal />
            <Layout.PressableColumn
              onPress={pickImage}
              grow
              center
              radius
              bg="inverse"
              border={[1, 'dashed', 'primary']}
              py="xs-12"
            >
              <Icon name="images-outline" size={28} iconColor="primary" />
              <Spacer.Vertical />
              <OpenSans.Primary size="s-16">Pick Photo</OpenSans.Primary>
            </Layout.PressableColumn>
          </>
        )}
      </Layout.Row>
    </>
  );
};
