import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ padding: 10, backgroundColor: 'blue' }}>
    <Text style={{ color: 'white' }}>{label}</Text>
  </TouchableOpacity>
);

export default Button;
