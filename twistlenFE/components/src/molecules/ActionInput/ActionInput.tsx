import { View, StyleSheet, Platform } from "react-native";
import React, { useState, useRef } from "react";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import CustomDropDown from "../../atoms/CustomDropDown/CustomDropDown";

const ActionInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<View>(null);

  const filterOptions = [
    { id: "1", name: "All Categories" },
    { id: "2", name: "Electronics" },
    { id: "3", name: "Clothing" },
    { id: "4", name: "Books" },
    { id: "5", name: "Home" },
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    console.log("Filters applied:", selectedFilters);
  };

  const handleFilterSelect = (items: any[]) => {
    setSelectedFilters(items);
    // Don't close dropdown here - let user click Done/outside
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Input
            value={searchQuery}
            placeholder={"Enter your query here"}
            onChangeText={setSearchQuery}
            inputStyle={styles.input}
            mode={"flat"}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            horizontalPadding={15}
            verticalPadding={8}
            title={"Search"}
            onPress={handleSearch}
            buttonColor="black"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  inputContainer: {
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    height: 40,
  },
  buttonWrapper: {
    marginLeft: 10,
  },
  dropdownTrigger: {
    marginLeft: 10,
  },
  dropdownContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
    maxHeight: 300, // Limit dropdown height
  },
});

export default ActionInput;
