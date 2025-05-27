import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Input from "../../atoms/Input/Input";
import ToggleButton from "../../atoms/ToggleButton/ToggleButton";
import Button from "../../atoms/Button/Button";
import CustomFormMultiCheckBox from "../../atoms/CustomFormMultiCheckBox/CustomFormMultiCheckBox";

const ProductShippingForm = ({ initialData = {}, onSubmit, onBack }) => {
  // Form state
  const [formData, setFormData] = useState({
    sku: "",
    stock_quantity: "",
    stock_status: "in_stock",
    weight: {
      value: "",
      unit: "kg",
    },
    dimensions: {
      length: "",
      width: "",
      height: "",
      unit: "cm",
    },
    shipping_methods: [],
    origin_location: "",
    ...initialData,
  });

  // Shipping options
  const shippingOptions = [
    { id: "standard", value: "Standard" },
    { id: "express", value: "Express" },
    { id: "pickup", value: "Local Pickup" },
  ];

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle nested object changes (weight, dimensions)
  const handleNestedChange = (parentField, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [field]: value,
      },
    }));
  };

  // Handle shipping methods toggle
  const handleShippingMethodToggle = (id) => {
    setFormData((prev) => {
      const methods = [...prev.shipping_methods];
      const index = methods.indexOf(id);

      if (index === -1) {
        methods.push(id);
      } else {
        methods.splice(index, 1);
      }

      return {
        ...prev,
        shipping_methods: methods,
      };
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Convert numeric fields to numbers
    const submissionData = {
      ...formData,
      stock_quantity: Number(formData.stock_quantity),
      weight: {
        ...formData.weight,
        value: Number(formData.weight.value),
      },
      dimensions: {
        ...formData.dimensions,
        length: Number(formData.dimensions.length),
        width: Number(formData.dimensions.width),
        height: Number(formData.dimensions.height),
      },
    };

    onSubmit(submissionData);
  };

  return (
    <View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ marginBottom: 20 }}>
          {/* SKU */}
          <Input
            label="SKU (Stock Keeping Unit)"
            value={formData.sku}
            onChangeText={(text) => handleChange("sku", text)}
            placeholder="PROD-12345"
            helperText="Unique identifier for inventory tracking"
          />

          {/* Stock Quantity */}
          <Input
            label="Stock Quantity"
            value={formData.stock_quantity.toString()}
            onChangeText={(text) =>
              handleChange("stock_quantity", text.replace(/[^0-9]/g, ""))
            }
            placeholder="100"
            keyboardType="numeric"
            helperText="Available items in stock"
          />

          {/* Stock Status */}
          <ToggleButton
            options={["in_stock", "out_of_stock", "pre_order"]}
            onToggle={(selected) => handleChange("stock_status", selected)}
            initialSelected={formData.stock_status}
            style={{ marginVertical: 10 }}
            textStyle={{ fontSize: 14 }}
          />

          {/* Weight */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weight</Text>
            <View style={styles.row}>
              <View style={styles.weightInput}>
                <Input
                  label="Value"
                  value={formData.weight.value.toString()}
                  onChangeText={(text) =>
                    handleNestedChange(
                      "weight",
                      "value",
                      text.replace(/[^0-9.]/g, "")
                    )
                  }
                  placeholder="0.5"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.unitSelector}>
                <ToggleButton
                  options={["kg", "lb"]}
                  onToggle={(selected) =>
                    handleNestedChange("weight", "unit", selected)
                  }
                  initialSelected={formData.weight.unit}
                  style={{ marginTop: 20 }}
                />
              </View>
            </View>
          </View>

          {/* Dimensions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dimensions</Text>
            <View style={styles.dimensionsContainer}>
              <View style={styles.dimensionInput}>
                <Input
                  label="Length"
                  value={formData.dimensions.length.toString()}
                  onChangeText={(text) =>
                    handleNestedChange(
                      "dimensions",
                      "length",
                      text.replace(/[^0-9.]/g, "")
                    )
                  }
                  placeholder="20"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.dimensionInput}>
                <Input
                  label="Width"
                  value={formData.dimensions.width.toString()}
                  onChangeText={(text) =>
                    handleNestedChange(
                      "dimensions",
                      "width",
                      text.replace(/[^0-9.]/g, "")
                    )
                  }
                  placeholder="15"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.dimensionInput}>
                <Input
                  label="Height"
                  value={formData.dimensions.height.toString()}
                  onChangeText={(text) =>
                    handleNestedChange(
                      "dimensions",
                      "height",
                      text.replace(/[^0-9.]/g, "")
                    )
                  }
                  placeholder="10"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.unitSelector}>
              <ToggleButton
                options={["cm", "inch"]}
                onToggle={(selected) =>
                  handleNestedChange("dimensions", "unit", selected)
                }
                initialSelected={formData.dimensions.unit}
              />
            </View>
          </View>

          {/* Shipping Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Methods</Text>
            <CustomFormMultiCheckBox
              items={shippingOptions}
              selectedItems={formData.shipping_methods.map((method) => ({
                id: method,
              }))}
              onToggle={handleShippingMethodToggle}
            />
          </View>

          {/* Origin Location */}
          <Input
            label="Origin Location"
            value={formData.origin_location}
            onChangeText={(text) => handleChange("origin_location", text)}
            placeholder="Country/City"
            helperText="Where the product ships from"
          />
        </View>
      </ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* Back Button */}
        <Button
          title="Back"
          onPress={onBack}
          mode="contained"
          style={{ marginTop: 20 }}
        />
        {/* Submit Button */}
        <Button
          title="Save Shipping Details"
          onPress={handleSubmit}
          mode="contained"
          style={{ marginTop: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 0,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weightInput: {
    flex: 0.7,
  },
  unitSelector: {
    flex: 0.25,
    justifyContent: "flex-end",
  },
  dimensionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dimensionInput: {
    width: "30%",
  },
});

export default ProductShippingForm;
