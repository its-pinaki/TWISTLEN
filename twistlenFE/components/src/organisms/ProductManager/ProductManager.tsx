import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import Typography from "../../atoms/Typography/Typography";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import CustomDropDown from "../../atoms/CustomDropDown/CustomDropDown";
import GenericTable from "../../atoms/GenericTable/GenericTable";
import CustomModal from "../../atoms/CustomModal/CustomModal";
import Stepper from "../../atoms/Stepper/Stepper";

const ProductManager = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["BasicProductInfo", "PricingInfo", "ShippingInfo"];


  const basicProductInfo = () => {
    return (
      <View>
        <Typography
          text="Basic Product Info"
          fontWeight={"bold"}
          fontSize={18}
        />
        <Input
          value={""}
          placeholder={"Enter product Name"}
          onChangeText={() => {}}
          inputStyle={{ height: 50 }}
          mode={"outlined"}
          label={"Product Name"}
        />
        <Input
          value={""}
          placeholder={"Enter product Description"}
          onChangeText={() => {}}
          inputStyle={{ height: 100 }}
          mode={"outlined"}
          label={"Product Description"}
          multiline={true}
        />
        <Input
          value={""}
          placeholder={"Enter Product Category"}
          onChangeText={() => {}}
          inputStyle={{ height: 50 }}
          mode={"outlined"}
          label={"Product Category"}
        />
        <Input
          value={""}
          placeholder={"Enter Product Tags(Comma Separated)"}
          onChangeText={() => {}}
          inputStyle={{ height: 100 }}
          mode={"outlined"}
          label={"Product Tags"}
          multiline={true}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
          }}
        >
          <Button
            horizontalPadding={15}
            verticalPadding={8}
            title={"Continue"}
            onPress={() => {}}
            buttonColor="black"
          />
          <Button
            horizontalPadding={15}
            verticalPadding={8}
            title={"Back"}
            onPress={() => {}}
            buttonColor="black"
            horizontalMargin={10}
          />
        </View>
      </View>
    );
  };
  const pricingInfo = () => {
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
      <View>
        <Typography text="Pricing Info" fontWeight={"bold"} fontSize={18} />
        <Input
          value={""}
          placeholder={"Enter product Price"}
          onChangeText={() => {}}
          inputStyle={{ height: 50 }}
          mode={"outlined"}
          label={"Product Price"}
        />
        <Input
          value={""}
          placeholder={"Enter product Discount"}
          onChangeText={() => {}}
          inputStyle={{ height: 50 }}
          mode={"outlined"}
          label={"Product Discount"}
        />
        <Input
          value={""}
          placeholder={"Enter Product Stock"}
          onChangeText={() => {}}
          inputStyle={{ height: 50 }}
          mode={"outlined"}
          label={"Product Stock"}
          keyboardType="numeric"
        />
        <Input
          value={""}
          placeholder={"Enter Product Stock Status"}
          onChangeText={() => {}}
          inputStyle={{ height: 50 }}
          mode={"outlined"}
          label={"Product Stock Status"}
        />
        <CustomDropDown
          value={data}
          onSelect={handleSelect}
          uniqueKey="id"
          displayName="name"
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          single={false} // Change to true if you want single selection
          texttype="Options"
          searchPlaceholder="Search..."
          isError={false}
          errorMsg="Please select at least one item"
        />
        <Input
          value={""}
          placeholder={"Enter Minimum Order Quantity"}
          onChangeText={() => {}}
          inputStyle={{ height: 50 }}
          mode={"outlined"}
          label={"Minimum Order Quantity"}
          keyboardType="numeric"
        />
        <Input
          value={""}
          placeholder={"Enter Maximum Order Quantity"}
          onChangeText={() => {}}
          inputStyle={{ height: 50 }}
          mode={"outlined"}
          label={"Maximum Order Quantity"}
          keyboardType="numeric"
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
          }}
        >
          <Button
            horizontalPadding={15}
            verticalPadding={8}
            title={"Continue"}
            onPress={() => {}}
            buttonColor="black"
          />
          <Button
            horizontalPadding={15}
            verticalPadding={8}
            title={"Back"}
            onPress={() => {}}
            buttonColor="black"
            horizontalMargin={10}
          />
        </View>
      </View>
    );
  };
  const shippingInfo = () => {
    return (
      <View>
        <Typography text="Shipping Info" fontWeight={"bold"} fontSize={18} />
        <Input
          value={""}
          placeholder={"Enter Expeced Time"}
          onChangeText={() => {}}
          inputStyle={{ height: 50 }}
          mode={"outlined"}
          label={"Expected Time"}
        />
        <Input
          value={""}
          placeholder={"Shipping Charges"}
          onChangeText={() => {}}
          inputStyle={{ height: 50 }}
          mode={"outlined"}
          label={"Shipping Charges"}
        />
      </View>
    );
  };
  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name", sortable: true },
    { key: "age", title: "Age", sortable: true },
    { key: "email", title: "Email" },
  ];

  const data = [
    { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
    { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  ];

  return (
    <ScrollView>
      {/* {pricingInfo()} */}
      {/* {basicProductInfo()} */}
      {/* {shippingInfo()} */}
      <CustomModal
        modalVisible={isAddProductOpen}
        transparent={true}
        closeModal={() => {
          setIsAddProductOpen(false);
        }}
        modalContent={() => {
          return <View>
            <Stepper steps={steps} activeStep={activeStep} activeColor="#2ed573" inactiveColor="#dfe4ea" />
          </View>;
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          horizontalPadding={15}
          verticalPadding={8}
          title={"Add Product"}
          onPress={() => {
            setIsAddProductOpen(true);
          }}
          buttonColor="black"
        />
      </View>
      <GenericTable
        columns={columns}
        data={data}
        rowsPerPage={3}
        themeColor="#FF5733"
      />
    </ScrollView>
  );
};

export default ProductManager;
