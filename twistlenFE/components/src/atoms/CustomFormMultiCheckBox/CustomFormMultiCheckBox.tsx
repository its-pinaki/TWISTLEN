import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import CustomFormMultiCheckBoxStyles from "./CustomFormMultiCheckBox.styles";

interface Item {
  id: string | number;
  name: string;
  value: any;
}

interface CustomFormMultiCheckBoxProps {
  items: Item[];
  header?: string;
  selectedItems: Item[];
  onToggle: (selectedItems: Item[]) => void;
  multiSelect?: boolean; // new prop
}

const CustomFormMultiCheckBox: React.FC<CustomFormMultiCheckBoxProps> = ({
  items,
  header = "",
  selectedItems,
  onToggle,
  multiSelect = true, // default to multi-select
}) => {
  const handleChange = (item: Item) => {
    const isSelected = selectedItems.some(
      (selected) => selected.id === item.id
    );

    if (multiSelect) {
      // MULTI SELECT LOGIC
      const updated = isSelected
        ? selectedItems.filter((selected) => selected.id !== item.id)
        : [...selectedItems, item];
      onToggle(updated);
    } else {
      // SINGLE SELECT LOGIC
      const updated = isSelected ? [] : [item];
      onToggle(updated);
    }
  };

  return (
    <View style={CustomFormMultiCheckBoxStyles.container}>
      {header ? (
        <Text style={CustomFormMultiCheckBoxStyles.header}>{header}</Text>
      ) : null}
      <View style={CustomFormMultiCheckBoxStyles.checkboxesContainer}>
        {items.map((item) => {
          const isChecked = selectedItems.some(
            (selected) => selected.id === item.id
          );
          return (
            <View
              key={item.id.toString()}
              style={CustomFormMultiCheckBoxStyles.checkboxContainer}
            >
              <TouchableOpacity
                key={item.id.toString()}
                style={CustomFormMultiCheckBoxStyles.checkboxContainer}
                onPress={() => handleChange(item)}
                activeOpacity={0.8}
              >
                <Checkbox
                  style={CustomFormMultiCheckBoxStyles.checkbox}
                  value={isChecked}
                  onValueChange={() => handleChange(item)}
                />
                <Text style={CustomFormMultiCheckBoxStyles.label}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CustomFormMultiCheckBox;
