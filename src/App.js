// App.js
import React from 'react';
import {SafeAreaView} from 'react-native';
import HomeScreen from './screens/HomeScreen/HomeScreen';

// Point d'entrée de l'application
const App = () => {
  return (
    <SafeAreaView>
      {/* On affiche l'écran principal ici */}
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
