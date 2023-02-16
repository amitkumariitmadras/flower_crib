import { View, Text } from 'react-native'
import React, { Children } from 'react'
import { Colors } from './styles'
const { brand, darkLight, primary } = Colors
//keyboard avoiding view
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
const KeyboardAvoidingWrapper = ({children}) => {
  return (
      <KeyboardAvoidingView style={{
          flex: 1,
            backgroundColor: primary,
      }}>
          <ScrollView>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  {children}
                </TouchableWithoutFeedback>
          </ScrollView>
   </KeyboardAvoidingView>
  )
}

export default KeyboardAvoidingWrapper