import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import CustomDropDownStyles from "./CustomDropDown.styles";

interface DropdownItem {
  id: string;
  name: string;
  icon?: JSX.Element;
  iconSelected?: JSX.Element;
  disabled?: boolean;
}

interface ComponentDropDownProps {
  viewitem?: JSX.Element;
  data: DropdownItem[];
  onSelect: (selectedItems: DropdownItem[]) => void;
  single: boolean;
  selectedItems: DropdownItem[];
  displayName: keyof DropdownItem;
  uniqueKey: keyof DropdownItem;
  searchPlaceholder: string;
}

const ComponentDropDown: React.FC<ComponentDropDownProps> = ({
  viewitem,
  data,
  onSelect,
  single,
  selectedItems: initialSelectedItems,
  displayName,
  uniqueKey,
  searchPlaceholder,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>(
    initialSelectedItems || []
  );

  useEffect(() => {
    setSelectedItems(initialSelectedItems);
  }, [initialSelectedItems]);

  const handleSelectItem = (item: DropdownItem) => {
    if (single) {
      setSelectedItems([item]);
      onSelect([item]);
    } else {
      setSelectedItems((prev) =>
        prev.some((selectedItem) => selectedItem.id === item.id)
          ? prev.filter((i) => i.id !== item.id)
          : [...prev, item]
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = selectedItems.filter((item) => item.id !== id);
    setSelectedItems(updatedItems);
    onSelect(updatedItems);
  };

  const filteredData = data.filter((item) =>
    item[displayName]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <View style={CustomDropDownStyles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          name="search1"
          size={20}
          color="#888"
          style={CustomDropDownStyles.searchIcon}
        />
        <TextInput
          placeholder={`Search ${searchPlaceholder}...`}
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={CustomDropDownStyles.input}
        />
      </View>

      {viewitem}

      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectItem(item)}
            style={[
              CustomDropDownStyles.item,
              selectedItems.some((selected) => selected.id === item.id) &&
                CustomDropDownStyles.selectedItem,
            ]}
            disabled={item.disabled}
          >
            <Text style={CustomDropDownStyles.itemText}>{item.name}</Text>
            {selectedItems.some((selected) => selected.id === item.id) && (
              <AntDesign name="check" size={20} color="#222f3e" />
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item[uniqueKey].toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      />

      {filteredData.length === 0 && (
        <View style={CustomDropDownStyles.noItemsContainer}>
          <MaterialIcons name="mood-bad" size={26} />
          <Text style={CustomDropDownStyles.noItemsText}>No items found</Text>
        </View>
      )}

      {!single && (
        <TouchableOpacity
          onPress={() => onSelect(selectedItems)}
          style={CustomDropDownStyles.button1}
        >
          <Text style={CustomDropDownStyles.buttonText1}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ComponentDropDown;
