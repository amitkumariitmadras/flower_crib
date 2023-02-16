import React, {useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
  Colors
} from '../components/styles';
import { ActivityIndicator } from 'react-native';
// asyncstorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';

// Colors
const { brand, darkLight, primary } = Colors;

const Welcome = ({ navigation }) => {
  // const { name, email } = route.params;
  //credentials context
  const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);
  const { name, email } = storeCredentials;

  const clearLogin = () => {
    AsyncStorage.removeItem('flowerCribCredentials')
      .then(() => {
        setStoreCredentials('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('../assets/img/flower4.jpg')} />
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
          <SubTitle welcome={true}>{name || 'Flower home'}</SubTitle>
          <SubTitle welcome={true}>{email || 'raja@gmail.com'}</SubTitle>
          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('../assets/img/flowerlogo.jpg')} />

            <Line />
            <StyledButton onPress={clearLogin}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
            <StyledButton onPress={() => {
              navigation.navigate('SignUp1')
            }}> 
              <ButtonText>Signup page</ButtonText>
            </StyledButton>
            
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
