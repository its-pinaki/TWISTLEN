// Button Component
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  mode?: 'contained' | 'outlined' | 'text';
  buttonColor?: string;
  textColor?: string;
  borderRadius?: number;
  horizontalPadding?: number;
  verticalPadding?: number;
  style?: object;
  textStyle?: object;
  borderColor?:string;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  mode = 'contained',
  buttonColor,
  textColor,
  borderRadius = 8,
  horizontalPadding = 0,
  verticalPadding = 0,
  style = {},
  textStyle = {},
  borderColor=""
}) => {
  const theme = useTheme();
  const backgroundColor = buttonColor || (mode === 'contained' ? theme.colors.primary : 'transparent');
  const color = textColor || (mode === 'contained' ? 'white' : theme.colors.primary);
  const borderWidth = mode === 'outlined' ? 1 : 0;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        { 
          backgroundColor, 
          borderRadius, 
          borderWidth, 
          borderColor: borderColor,
          paddingHorizontal: horizontalPadding,
          paddingVertical: verticalPadding,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color }, textStyle]}>{loading ? 'Loading...' : title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start', // Wrap content
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Button;