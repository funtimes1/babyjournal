import React from 'react';
import { Alert, Image } from 'react-native';
import { Icon } from './Icons/Icon';
import { Layout } from './Layout.components';
import { Spacer } from './Spacer.components';
import { OpenSans } from './Typography.components';
import * as ImagePicker from 'expo-image-picker';
import { ImageEditor } from 'expo-image-editor';

export const AddPhoto: React.FC = () => {
  const [image, setImage] = React.useState<string | undefined>(undefined);
  const [dimensions, setDimensions] = React.useState({ h: 0, w: 0 });

  const [editorVisible, setEditorVisible] = React.useState(false);

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
    // And set the image editor to be visible
    // setEditorVisible(true);
  };

  const aspect = dimensions.h / dimensions.w;

  console.log({ dimensions, aspect });

  return (
    <>
      <Layout.Row bg="navBackground">
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
      </Layout.Row>
      <Spacer.Vertical />
      <ImageEditor
        fixedCropAspectRatio={16 / 9}
        lockAspectRatio={false}
        visible={editorVisible}
        onCloseEditor={() => setEditorVisible(false)}
        imageUri={image}
        minimumCropDimensions={{
          width: 100,
          height: 100,
        }}
        onEditingComplete={(result) => {
          Alert.alert(JSON.stringify(result, null, 2));
        }}
      />
      {image && !isNaN(aspect) && (
        <Layout.Column center>
          <Layout.Column radius style={{ overflow: 'hidden' }}>
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 * aspect }}
              resizeMode="contain"
            />
          </Layout.Column>
        </Layout.Column>
      )}
    </>
  );
};
