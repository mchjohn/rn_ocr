import { SafeAreaView, StyleSheet } from 'react-native';

import { PickerImage } from '../../components/PickerImage';

export function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <PickerImage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#010001',
  },
});
