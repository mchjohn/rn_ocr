import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {Button} from '../Button';

interface Toast {
  message: string;
  isVisible: boolean;
}

interface StateProps {
  image: string | null;
  toast: Toast;
  loading: boolean;
  textRecognition: [] | null;
}

export function PickerImage() {
  const [state, setState] = useState<StateProps>({
    image: null,
    loading: false,
    textRecognition: null,
    toast: {
      message: '',
      isVisible: false,
    },
  });

  function onImageSelect(response: ImagePickerResponse) {
    if (response.assets && response.assets[0].uri) {
      setState({...state, image: response.assets[0].uri});
    }
  }

  function handleGetImage(type: 'capture' | 'library') {
    setState({...state, loading: true});

    type === 'capture'
      ? launchCamera({mediaType: 'photo'}, onImageSelect)
      : launchImageLibrary({mediaType: 'photo'}, onImageSelect);
  }

  return (
    <View style={styles.container}>
      <Button
        title="Selecionar da galeria"
        onPress={() => handleGetImage('library')}
      />

      <Button title="Tirar foto" onPress={() => handleGetImage('capture')} />

      {state.image && (
        <Image
          style={styles.image}
          source={{
            uri: state.image,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  image: {
    width: 400,
    height: 400,
    marginTop: 32,
  },
});
