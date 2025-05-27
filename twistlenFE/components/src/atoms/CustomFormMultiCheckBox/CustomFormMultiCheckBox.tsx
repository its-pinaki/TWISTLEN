import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox"; // Adjust import as needed
import CustomFormMultiCheckBoxStyles from "./CustomFormMultiCheckBox.styles";

const CustomFormMultiCheckBox = ({ items, header = '', selectedItems, onToggle }) => {
  return (
    <View style={CustomFormMultiCheckBoxStyles.container}>
      {header && <Text style={CustomFormMultiCheckBoxStyles.header}>{header}</Text>}
      <View style={CustomFormMultiCheckBoxStyles.checkboxesContainer}>
        {items.map((item) => (
          <View key={item.id} style={CustomFormMultiCheckBoxStyles.checkboxContainer}>
            <Checkbox
              style={CustomFormMultiCheckBoxStyles.checkbox}
              value={selectedItems?.some((selected) => selected.id === item.id)}
              onValueChange={() => onToggle(item.id, item.value)}
            />
            <Text style={CustomFormMultiCheckBoxStyles.label}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default CustomFormMultiCheckBox;
