import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import Typography from "../../atoms/Typography/Typography";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import CustomDropDown from "../../atoms/CustomDropDown/CustomDropDown";
import GenericTable from "../../atoms/GenericTable/GenericTable";
import CustomModal from "../../atoms/CustomModal/CustomModal";
import Stepper from "../../atoms/Stepper/Stepper";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import { router } from "expo-router";
import ToggleButton from "../../atoms/ToggleButton/ToggleButton";

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
    { key: "product", title: "Product" },
    { key: "stock", title: "Stock", sortable: true },
    { key: "price", title: "Price", sortable: true },
    { key: "status", title: "Status" },
    { key: "created", title: "Created" },
    { key: "actions", title: "Actions" },
  ];

  const data = [
    {
      product: (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ImageBackground
            source={{ uri: "https://picsum.photos/200" }}
            style={{
              height: 30,
              width: 30,
              borderRadius: 5,
              backgroundColor: "#E0F7FA",
              marginRight: 10,
            }}
            imageStyle={{ borderRadius: 8 }}
          ></ImageBackground>
          <View>
            <Typography
              text={"Wireless HeadPhone Pro"}
              style={{
                fontSize: 14,
                fontWeight: "bold",
                fontFamily: "",
                color: "#000000",
                margin: 0,
              }}
            />
            <Typography
              text={"#sku-231"}
              style={{
                fontSize: 14,
                fontWeight: "bold",
                fontFamily: "",
                color: "#6B7280",
                margin: 0,
              }}
            />
          </View>
        </View>
      ),
      stock: (
        <Typography
          text={"124"}
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "",
            color: "#000000",
            margin: 0,
          }}
        />
      ),
      price: (
        <Typography
          text={"$230.00"}
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "",
            color: "#000000",
            margin: 0,
          }}
        />
      ),
      status: (
        <Typography
          text={"Active"}
          style={{
            fontSize: 14,
            fontWeight: "bold",
            borderRadius: 15,
            color: "#047857",
            margin: 0,
            backgroundColor: "#D1FAE5",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        />
      ),
      created: (
        <Typography
          text={"Jan 15, 2025"}
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "",
            color: "#6B7280",
            margin: 0,
          }}
        />
      ),
      actions: (
        <View
          style={{
            $$css: true,
            _: "flex flex-row gap-2",
          }}
        >
          <IconBlock
            icon={{
              serviceType: "MaterialIcons",
              iconName: "delete",
              size: 16,
              color: "#EF4444",
              noBorder: true,
              style: {
                backgroundColor: "#FEE2E2",
                borderRadius: 8,
                padding: 3,
              },
            }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "eye",
              size: 16,
              color: "#2563EB",
              noBorder: true,
              style: {
                backgroundColor: "#E5E7EB",
                borderRadius: 8,
                padding: 3,
              },
            }}
          />
        </View>
      ),
    },
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
                  serviceType: "MaterialIcons",
                  iconName: "local-offer",
                  size: 16,
                  color: "#000000",
                  noBorder: true,
                  label: "Create Offer",
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
            onPress={() => {
              router.push("(productmanager)/offeradditon");
            }}
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
            onPress={() => {
              router.push("/productaddition");
            }}
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
            borderWidth: 0.1,
            borderColor: "#E5E7EB",
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
                paddingHorizontal: 8,
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
            borderWidth: 0.1,
            borderColor: "#E5E7EB",
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
                paddingHorizontal: 8,
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
            borderWidth: 0.1,
            borderColor: "#E5E7EB",
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
                paddingHorizontal: 8,
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
      <ToggleButton
        options={["products", "offers"]}
        onToggle={(answer) => console.log(answer)}
        style={{
          width: "20%",
          alignSelf: "flex-start",
          borderRadius: 25,
          marginVertical: 10,
        }}
        textStyle={{
          fontSize: 12,
          fontFamily: "Arial",
        }}
      />
      <GenericTable
        columns={columns}
        data={data}
        rowsPerPage={3}
        themeColor="#2563EB"
      />
    </ScrollView>
  );
};

export default ProductManager;
