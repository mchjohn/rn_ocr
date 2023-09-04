import {Text, Pressable, StyleSheet} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({title, onPress}: ButtonProps) {
  return (
    <Pressable
      style={styles.button}
      android_ripple={{color: '#010001'}}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    minWidth: 280,
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#ffc719',
    paddingHorizontal: 16,
  },
  text: {
    color: '#010001',
    fontSize: 24,
    fontWeight: '600',
  },
});
