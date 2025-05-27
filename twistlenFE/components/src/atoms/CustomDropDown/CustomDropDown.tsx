import React, { useState } from "react";
import { View, TouchableOpacity, Text, FlatList,ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ComponentDropDown from "./ComponentDropDown";
import CustomDropDownStyles from "./CustomDropDown.styles";

interface CustomDropDownProps {
  value: any[];
  onSelect: (items: any[]) => void;
  uniqueKey: string;
  displayName: string;
  selectedItems: any[];
  single: boolean;
  setSelectedItems: (items: any[]) => void;
  isError?: boolean;
  errorMsg?: string;
  texttype: string;
  searchPlaceholder: string;
  bordercolor?: string;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  value,
  onSelect,
  uniqueKey,
  displayName,
  selectedItems,
  single,
  setSelectedItems,
  isError,
  errorMsg,
  texttype,
  searchPlaceholder,
  bordercolor,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (items: any[]) => {
    onSelect(items);
    setDropdownVisible(false);
  };

  const handleClose = () => {
    setDropdownVisible(false);
  };

  const handleRemoveItem = (itemId: string) => {
    setSelectedItems(selectedItems?.filter((item) => item[uniqueKey] !== itemId));
  };

  const renderSelectedItems = () => {
    if (selectedItems.length === 0) return null;
  
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={CustomDropDownStyles.selectedItemsContainer}
      >
        {selectedItems.map((item) => (
          <View key={item.id} style={CustomDropDownStyles.badge}>
            <Text style={CustomDropDownStyles.badgeText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
              <AntDesign name="close" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={[CustomDropDownStyles.container, { borderColor: bordercolor || "#ddd", borderWidth: 1, borderRadius: 8, padding: 10 }]}> 
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={CustomDropDownStyles.button}>
        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={{marginRight: 10, fontSize: 16, color: "#333"}}>
            {single
              ? selectedItems?.length > 0
                ? selectedItems[0][displayName]
                : `${texttype}`
              : selectedItems?.length > 0
              ? `Selected (${selectedItems?.length})`
              : `Select ${texttype}`}
          </Text>
          <AntDesign name={dropdownVisible ? "caretup" : "caretdown"} size={18} color="#666" />
        </View>
      </TouchableOpacity>
      {!dropdownVisible && !single && renderSelectedItems()}
      {dropdownVisible && (
        <View style={CustomDropDownStyles.dropdownContainer}>
          <ComponentDropDown
            data={value}
            onSelect={handleSelect}
            selectedItems={selectedItems}
            isVisible={dropdownVisible}
            onClose={handleClose}
            displayName={displayName}
            single={single}
            uniqueKey={uniqueKey}
            searchPlaceholder={searchPlaceholder}
          />
        </View>
      )}
      {isError && <Text style={{ color: "red", marginTop: 5 }}>{errorMsg}</Text>}
    </View>
  );
};

export default CustomDropDown;
