import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import TextRecognition from '@react-native-ml-kit/text-recognition';

import { Button } from '../Button';

interface OcrProps {
  text: string;
  isLoading: boolean;
}

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
  const [ocr, setOrc] = useState<OcrProps>({
    text: '',
    isLoading: false,
  });
  const [state, setState] = useState<StateProps>({
    image: null,
    loading: false,
    textRecognition: null,
    toast: {
      message: '',
      isVisible: false,
    },
  });

  const onOCR = useCallback(
    async (image: string) => {
      setOrc({ ...ocr, isLoading: true });

      const result = await TextRecognition.recognize(image);

      setOrc({ isLoading: false, text: result.text });
    },
    [ocr],
  );

  function onImageSelect(response: ImagePickerResponse) {
    if (response.assets && response.assets[0].uri) {
      const uri = response.assets[0].uri;

      setState({ ...state, loading: false, image: uri });
      onOCR(uri);
    }
  }

  function handleGetImage(type: 'capture' | 'library') {
    setState({ ...state, loading: true });

    type === 'capture'
      ? launchCamera({ mediaType: 'photo' }, onImageSelect)
      : launchImageLibrary({ mediaType: 'photo' }, onImageSelect);
  }

  return (
    <View style={styles.container}>
      <Button
        title="Selecionar da galeria"
        onPress={() => handleGetImage('library')}
      />

      <Button title="Tirar foto" onPress={() => handleGetImage('capture')} />

      {state.loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffc719" />
        </View>
      )}

      {state.image && (
        <View style={styles.wrapperImage}>
          <Image
            style={styles.image}
            source={{
              uri: state.image,
            }}
          />

          <Icon name="chevron-down" size={30} color="#ffc719" />
        </View>
      )}

      {ocr.isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffc719" />
        </View>
      )}

      {ocr.text && (
        <ScrollView style={styles.ocrView}>
          <Text style={styles.text}>{ocr.text}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: '100%',
  },
  loading: {
    height: 400,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperImage: {
    width: 400,
    height: 310,
    marginTop: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    marginBottom: 8,
  },
  ocrView: {
    height: 300,
  },
  text: {
    color: '#ffc719',
    fontSize: 18,
    marginVertical: 16,
  },
});
