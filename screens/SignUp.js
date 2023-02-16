import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
// Api Client
import axios from 'axios';
// asyncstorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';

// formik
import { Formik } from 'formik';

// date time picker
import DateTimePicker from '@react-native-community/datetimepicker';
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
} from '../../../login-register-react-native/flower-crib/components/styles';

// Icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//keyboard avoiding view
import KeyboardAvoidingWrapper from '../../../login-register-react-native/flower-crib/components/KeyboardAvoidingWrapper';
// Colors
const { brand, darkLight, primary } = Colors;
const SignUp = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // Actual date of birth to be sent
  const [dob, setDob] = useState();

  //credentials context
  const { storeCredentials, setStoreCredentials } = useContext(CredentialsContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };
  const showDatePicker = () => {
    setShow(true);
  };

  const handleSignUp = async (credentials, setSubmitting) => {
    console.log(credentials);
    handleMessage(null);

    const url = 'http://192.168.137.1:8000/auth/signup';

    await axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        console.log(result);
        const status = result.status;
        const message = result.message;
        console.log(message);
        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          persistLogin({ result, message});

        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
        setSubmitting(false);
        handleMessage('An error occurred. Please try again.');
      });


  };
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };
    const persistLogin = (credentials, message) => {
      AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(credentials))
        .then(() => {
          handleMessage(message);
          setStoreCredentials(credentials);
        })
        .catch((error) => {
          console.log(error);
          handleMessage('Persisting login failed.');
        });
    };
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 20,
            height: '100%',
          }}
        >
          <ScrollView
            style={{
              width: '100%',
              padding: 0,
            }}
            showsVerticalScrollIndicator={false}
          >
            <InnerContainer>
              <PageTitle>Flower Crib</PageTitle>
              <SubTitle>Account Signup</SubTitle>
              {show && (
                <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} onChange={onChange} />
              )}
              <Formik
                initialValues={{
                  username: '',
                  name: '',
                  email: '',
                  phoneNumber: '',
                  dateOfBirth: '',
                  password: '',
                  confirmPassword: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                  values = { ...values, dateOfBirth: dob };
                  if (
                    values.username == '' ||
                    values.name == '' ||
                    values.email == '' ||
                    values.phoneNumber == '' ||
                    values.dateOfBirth == '' ||
                    values.password == '' ||
                    values.confirmPassword == ''
                  ) {
                    handleMessage('Please fill in all fields.');
                    setSubmitting(false);
                  } else if (values.password !== values.confirmPassword) {
                    handleMessage('Passwords do not match.');
                    setSubmitting(false);
                  } else {
                    handleSignUp(values, setSubmitting);
                  }
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                  <StyledFormArea>
                    <MyTextInput
                      label="Username"
                      icon="person"
                      placeholder="amitkumar"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                    />
                    <MyTextInput
                      label="Full Name"
                      icon="person-fill"
                      placeholder="Amit Kumar"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
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
                      label="Phone Number"
                      icon="device-mobile"
                      placeholder="6262626262"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      keyboardType="numeric"
                    />

                    <MyTextInput
                      label="Date of Birth"
                      icon="calendar"
                      placeholder="YYYY-MM-DD"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange('dateOfBirth')}
                      onBlur={handleBlur('dateOfBirth')}
                      value={dob ? dob.toISOString().slice(0, 10) : ''}
                      isDate={true}
                      editable={false}
                      showDatePicker={showDatePicker}
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
                    <MyTextInput
                      label=" Confirm Password"
                      icon="lock"
                      placeholder="* * * * * * * *"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      secureTextEntry={hidePassword}
                      isPassword={true}
                      hidePassword={hidePassword}
                      setHidePassword={setHidePassword}
                    />

                    <MsgBox type={messageType}>{message}</MsgBox>
                    {!isSubmitting && (
                      <StyledButton onPress={handleSubmit}>
                        <ButtonText>Signup</ButtonText>
                      </StyledButton>
                    )}
                    {isSubmitting && (
                      <StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={primary} />
                      </StyledButton>
                    )}

                    <Line />
                    <ExtraView>
                      <ExtraText>Already have an Account? </ExtraText>
                      <TextLink onPress={() => navigation.navigate('Login')}>
                        <TextLinkContent>Login</TextLinkContent>
                      </TextLink>
                    </ExtraView>
                  </StyledFormArea>
                )}
              </Formik>
            </InnerContainer>
          </ScrollView>
        </View>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View
      style={{
        width: '100%',
      }}
    >
      <LeftIcon>
        <Octicons name={icon} size={25} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker} activeOpacity={1}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={25} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default SignUp;
