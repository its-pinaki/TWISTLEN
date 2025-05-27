import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const KeyValuePair = ({ keyVal, onValueChange, index }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={keyVal.key}
        editable={false}
        style={styles.keyInput}
      />
      <TextInput
        placeholder="Value"
        value={keyVal.value}
        onChangeText={(text) => onValueChange(index, text)}
        style={styles.valueInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyInput: {
    padding: 5,
    marginRight: 5,
    width: 120,
    backgroundColor: '#f0f0f0',
  },
  valueInput: {
    padding: 5,
    width: 200,
  },
});

export default KeyValuePair;
