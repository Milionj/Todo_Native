// src/App.tsx

import React from 'react';
import {SafeAreaView} from 'react-native';
import HomeScreen from './screens/HomeScreen/HomeScreen'; // Import de ton écran principal

// Composant principal de l'application
const App: React.FC = () => {
  return (
    //  SafeAreaView protège l’affichage des bords (utile sur iOS notamment)
    <SafeAreaView style={{flex: 1}}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
