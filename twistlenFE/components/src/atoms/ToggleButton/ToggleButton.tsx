import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ToggleButtonProps = {
  options: [string, string]; // Two values
  onToggle: (selected: string) => void;
  initialSelected?: string;
  style?: object;
  textStyle?: object;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  onToggle,
  initialSelected,
  style = {},
  textStyle = {},
}) => {
  const [selected, setSelected] = useState(initialSelected || options[0]);

  const handleToggle = (value: string) => {
    setSelected(value);
    onToggle(value);
  };

  return (
    <View style={[styles.container, style]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selected === option ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => handleToggle(option)}
        >
          <Text
            style={[
              styles.buttonText,
              selected === option ? styles.selectedText : styles.unselectedText,
              textStyle,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    width:"100%",
    marginTop:5,
    marginBottom:5
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    backgroundColor: "#1dd1a1",
  },
  unselectedButton: {
    backgroundColor: "#ddd",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedText: {
    color: "white",
  },
  unselectedText: {
    color: "black",
  },
});

export default ToggleButton;
