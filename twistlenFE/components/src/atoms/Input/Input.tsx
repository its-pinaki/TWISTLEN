import React, { useState, useEffect } from 'react';
import { TextInput, Text } from 'react-native-paper';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const getResponsiveStyles = (screenWidth) => {
  return {
    container: {
      // marginVertical: screenWidth < 480 ? 6 : 10,
      marginVertical: 5,
      width: screenWidth < 480 ? '100%' : '80%',
      // alignSelf: 'center',
    },
    input: {
      backgroundColor: 'white',
      fontSize: screenWidth < 480 ? 14 : 16,
      paddingHorizontal: screenWidth < 480 ? 8 : 12,
    },
    helperText: {
      marginTop: 4,
      fontSize: screenWidth < 480 ? 10 : 12,
    },
  };
};

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  mode = 'outlined',
  error = false,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  style = {width:"100%"},
  inputStyle = {},
  helperText = '',
  helperTextColor = 'gray',
  isPasswordField = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
  const [screenWidth, setScreenWidth] = useState(width);
  const responsiveStyles = getResponsiveStyles(screenWidth);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(Dimensions.get('window').width);
    const subscription = Dimensions.addEventListener('change', updateWidth);
    return () => subscription?.remove();
  }, []);

  return (
    <View style={[responsiveStyles.container, style]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={isPasswordVisible}
        mode={mode}
        error={error}
        disabled={disabled}
        multiline={multiline}
        numberOfLines={numberOfLines}
        left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : null}
        right={isPasswordField ? (
          <TextInput.Icon
            icon={isPasswordVisible ? 'eye-off' : 'eye'}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        ) : rightIcon ? (
          <TextInput.Icon icon={rightIcon} />
        ) : null}
        style={[responsiveStyles.input, inputStyle]}
      />
      {helperText ? <Text style={[responsiveStyles.helperText, { color: helperTextColor }]}>{helperText}</Text> : null}
    </View>
  );
};

export default Input;