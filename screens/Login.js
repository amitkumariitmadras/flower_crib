import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from '../components/styles';
// Icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

// Colors
const { brand, darkLight, primary } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
// Api Client
import axios from 'axios';

// asyncstorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  //credentials context
  const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);

  const handleLogin = (credentials, setSubmitting) => {
    console.log(credentials);
    handleMessage(null);

    const url = 'http://192.168.137.1:8000/auth/signin';

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { loginStatus } = result;
        console.log(result);
        if (!loginStatus) {
          handleMessage(message, 'FAILED');
        } else {
          persistLogin({ result, message, loginStatus });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        handleMessage('An error occurred. Please try again.');
      });
  };
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  const persistLogin = (credentials, message, loginStatus) => {
    AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, loginStatus);
        setStoreCredentials(credentials);

       })
      .catch((error) => {
        console.log(error);
        handleMessage('Persisting login failed.');
      });
  }
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="contain" source={require('../assets/img/flowerlogo.jpg')} />
          <PageTitle>Flower Crib</PageTitle>
          <SubTitle>Account Login</SubTitle>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == '' || values.password == '') {
                handleMessage('Please fill in all fields.');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="xyz@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
                <Line />
                <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" size={25} color={primary} />
                  <ButtonText google={true}>Sign in with Google</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('SignUp')}>
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View style={{
      width: '100%',
    }}>
      <LeftIcon>
        <Octicons name={icon} size={25} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={25} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
