import {SafeAreaView, StyleSheet, Text} from 'react-native';

import {PickerImage} from '../../components/PickerImage';

export function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Selecione uma imagem da galeria ou tire uma foto para fazer a extração
        do texto
      </Text>

      <PickerImage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#010001',
  },
  text: {
    color: '#ffc719',
    fontSize: 18,
    marginVertical: 16,
  },
});
