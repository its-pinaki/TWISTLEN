// Typography Component
import React from 'react';
import { Text, StyleSheet } from 'react-native';

type TypographyProps = {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  style?: object;
};

const Typography: React.FC<TypographyProps> = ({
  text,
  color = 'black',
  fontSize = 16,
  fontWeight = 'normal',
  textAlign = 'left',
  style = {},
}) => {
  return <Text style={[styles.text, { color, fontSize, fontWeight, textAlign }, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 4,
  },
});

export default Typography;