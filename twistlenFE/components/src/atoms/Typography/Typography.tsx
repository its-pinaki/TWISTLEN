// Typography Component
import React from 'react';
import { Text, StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

type TypographyProps = {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  href?: string; // New prop for links
  style?: TextStyle;
  onPress?: () => void; // Function to call on press
};

const Typography: React.FC<TypographyProps> = ({
  text,
  color = 'black',
  fontSize = 16,
  fontWeight = 'normal',
  textAlign = 'left',
  href,
  style = {},
  onPress,
}) => {
  if (href) {
    return (
      <Link href={href} style={[styles.link, { fontSize, fontWeight, textAlign }, style]}>
        {text}
      </Link>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Text style={[styles.text, { color, fontSize, fontWeight, textAlign }, style]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 4,
  },
  link: {
    color: 'black',
    textDecorationLine: 'underline',
    marginVertical: 4,
  },
});

export default Typography;
