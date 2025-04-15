import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Typography from "../../atoms/Typography/Typography";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import CustomDropDown from "../../atoms/CustomDropDown/CustomDropDown";
import GenericTable from "../../atoms/GenericTable/GenericTable";
import CustomModal from "../../atoms/CustomModal/CustomModal";
import Stepper from "../../atoms/Stepper/Stepper";
import IconBlock from "../../atoms/IconBlock/IconBlock";

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
    { id: 3, name: "Bob", age: 30, email: "bob@example.com" },
    { id: 4, name: "Bob", age: 30, email: "bob@example.com" },
    { id: 5, name: "Bob", age: 30, email: "bob@example.com" },
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
          return (
            <View>
              <Stepper
                steps={steps}
                activeStep={activeStep}
                activeColor="#2ed573"
                inactiveColor="#dfe4ea"
              />
            </View>
          );
        }}
      />
      <View
        style={{
          $$css: true,
          _: "flex justify-between flex-col md:flex-row ",
        }}
      >
        <Typography
          text={"Products"}
          style={{ fontFamily: "Poppins", fontWeight: "bold", fontSize: 24 }}
        />
        <View style={{ $$css: true, _: "flex justify-between flex-row" }}>
          <Button
            customContent={
              <IconBlock
                icon={{
                  serviceType: "Feather",
                  iconName: "upload",
                  size: 16,
                  color: "#000000",
                  noBorder: true,
                  label: "Bulk Upload",
                  // reverseLabel: true,
                  textStyle: {
                    fontSize: 16,
                    fontWeight: "normal",
                    fontFamily: "Inter",
                    color: "#4B5563",
                  },
                }}
              />
            }
            buttonColor="#FFFFFF"
            borderRadius={8}
            borderColor="#D1D5DB"
            mode={"outlined"}
          />
          <Button
            customContent={
              <IconBlock
                icon={{
                  serviceType: "FontAwesome6",
                  iconName: "add",
                  size: 16,
                  color: "#FFFFFF",
                  noBorder: true,
                  label: "Add Product",
                  // reverseLabel: true,
                  textStyle: {
                    fontSize: 16,
                    fontWeight: "normal",
                    fontFamily: "Inter",
                    color: "#FFFFFF",
                  },
                }}
              />
            }
            buttonColor="#2563EB"
            borderRadius={8}
            borderColor="#E5E7EB"
            mode={"outlined"}
            horizontalMargin={10}
          />
        </View>
      </View>

      <View
        style={{
          $$css: true,
          _: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // alignItems: "center",
            // justifyContent:"center",
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: 20,
            // shadowColor: "#000",
            // shadowOpacity: 0.05,
            // shadowRadius: 4,
            // elevation: 2,
            borderWidth:0.1,
            borderColor:"#E5E7EB"
          }}
        >
          <IconBlock
            icon={{
              serviceType: "MaterialCommunityIcons",
              iconName: "cube-outline",
              size: 16,
              color: "#2563EB", // Tailwind's blue-500
              noBorder: true,
              style: {
                backgroundColor: "#DBEAFE",
                borderRadius: 8,
                paddingHorizontal:8
              },

            }}
          />

          <View style={{ marginLeft: 12 }}>
            <Text style={{ color: "#6B7280", fontSize: 12 }}>
              Total Products
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>2,431</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            // alignItems: "center",
            // justifyContent:"center",
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: 20,
            // shadowColor: "#000",
            // shadowOpacity: 0.05,
            // shadowRadius: 4,
            // elevation: 2,
            borderWidth:0.1,
            borderColor:"#E5E7EB"
          }}
        >
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "check",
              size: 16,
              color: "#059669", // Tailwind's blue-500
              noBorder: true,
              style: {
                backgroundColor: "#D1FAE5",
                borderRadius: 8,
                paddingHorizontal:8
              },
            }}
          />

          <View style={{ marginLeft: 12 }}>
            <Text style={{ color: "#6B7280", fontSize: 12 }}>
              Active Products
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>1,890</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            // alignItems: "center",
            // justifyContent:"center",
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: 20,
            // shadowColor: "#000",
            // shadowOpacity: 0.05,
            // shadowRadius: 4,
            // elevation: 2,
            borderWidth:0.1,
            borderColor:"#E5E7EB"
          }}
        >
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "warning",
              size: 16,
              color: "#D97706", // Tailwind's blue-500
              noBorder: true,
              style: {
                backgroundColor: "#FEF3C7",
                borderRadius: 8,
                paddingHorizontal:8
              },
            }}
          />

          <View style={{ marginLeft: 12 }}>
            <Text style={{ color: "#6B7280", fontSize: 12 }}>
              Total Products
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>2,431</Text>
          </View>
        </View>
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
