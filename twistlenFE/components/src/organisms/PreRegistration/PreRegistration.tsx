import { View, Text } from "react-native";
import React, { useState } from "react";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import Input from "../../atoms/Input/Input";
import CustomDropDown from "../../atoms/CustomDropDown/CustomDropDown";
import Typography from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";

const PreRegistration = () => {
  const data = [
    { id: "1", name: "Option 1" },
    { id: "2", name: "Option 2" },
    { id: "3", name: "Option 3" },
  ];
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const handleSelect = (items: any[]) => {
    setSelectedItems(items);
  };
  return (
    <View
      style={{
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <IconBlock
        icon={{
          serviceType: "AntDesign",
          iconName: "form",
          size: 24,
          color: "black",
        }}
      />
      <Typography
        text="PreRegistration Details"
        fontWeight={"bold"}
        fontSize={12}
      />
      <Input
        value={""}
        onChangeText={(text) => {}}
        placeholder={"Enter Store Name"}
        mode={"outlined"}
        label={"Store Name"}
      />
      <CustomDropDown
        value={data}
        onSelect={handleSelect}
        uniqueKey="id"
        displayName="name"
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        single={false} // Change to true if you want single selection
        texttype="Categories"
        searchPlaceholder="Search..."
        isError={false}
        errorMsg="Please select at least one item"
        bordercolor={"#576574"}
      />
      <Input
        value={""}
        onChangeText={(text) => {}}
        placeholder={"Enter Website/Social Media Link"}
        mode={"outlined"}
        label={"Website/Social Media Link"}
      />
      <Button
        title={"Continue"}
        buttonColor={"#2e86de"}
        onPress={() => {}}
        horizontalPadding={20}
        verticalPadding={10}
        style={{ width: "100%" }}
        href="/(home)"
      />
    </View>
  );
};

export default PreRegistration;
