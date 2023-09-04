/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {StatusBar} from 'react-native';

import {Home} from './src/screens/Home';

function App(): JSX.Element {
  return (
    <>
      <Home />

      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#010001"
      />
    </>
  );
}

export default App;
