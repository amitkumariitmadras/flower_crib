import React, { useState } from 'react';
// React Navigation stack
import RootStack from './navigation/RootStack';
// apploading
import AppLoading from 'expo-app-loading';
// asyncstorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './components/CredentialsContext';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storeCredentials, setStoreCredentials] = useState('');
  const checkLoginCredentials = () => {
    AsyncStorage.getItem('flowerCribCredentials')
      .then((result) => {
        if (result != null) {
          setStoreCredentials(JSON.parse(result));
        } else {
          setStoreCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };

  if (!appReady) {
    return <AppLoading startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn} />;
  }

  return (
    <CredentialsContext.Provider value={{ storeCredentials, setStoreCredentials }}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}
