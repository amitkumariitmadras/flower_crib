import React from 'react';
import { View, Text } from 'react-native';

import { Colors } from '../components/styles';
//REAct Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';
import SignUp1 from '../screens/SignUp1';
const { brand, darkLight, primary } = Colors;
const Stack = createNativeStackNavigator();
//credentials context
import { CredentialsContext } from '../components/CredentialsContext';

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storeCredentials, setStoreCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: 'tertiary',
              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
            initialRouteName="Login"
          >
            {storeCredentials ? (
              <Stack.Screen name="Welcome" component={Welcome} />
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            )}
            <Stack.Screen name="SignUp1" component={SignUp1} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
