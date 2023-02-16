import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
// Api Client
import axios from 'axios';

//emailjs
import emailjs from '@emailjs/browser';

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
} from '../components/styles';

// Icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
// Colors
const { brand, darkLight, primary } = Colors;
const SignUp1 = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const form = useRef();

  // Actual date of birth to be sent
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };
  const showDatePicker = () => {
    setShow(true);
  };

  const handleSignUp = (credentials, setSubmitting, e) => {
    console.log(credentials);
    handleMessage(null);

    emailjs.sendForm('service_l13bk6h', 'template_qg9xx0b', form.current, 'cPFQEQAUDjRYMsp5_').then(
      console.log('Email'),
      (result) => {
        console.log(result.text);
        console.log('Email sent successfully');
        setSubmitting(false);
      },
      (error) => {
        console.log(error.text);
        setSubmitting(false);
      },
    );
  };
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
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
                forwardRef={form}
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
                      name="username"
                    />
                    <MyTextInput
                      label="Full Name"
                      icon="person-fill"
                      placeholder="Amit Kumar"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      name="name"
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
                      name="email"
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
                      name="phoneNumber"
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
                      name="dateOfBirth"
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
                      name="password"
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
                      name="confirmPassword"
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

export default SignUp1;
