import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
});
