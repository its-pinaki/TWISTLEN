import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import CustomFormMultiCheckBox from "../../atoms/CustomFormMultiCheckBox/CustomFormMultiCheckBox";

const ProductShippingForm = ({ initialData = {}, onSubmit, onBack }) => {
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

  const shippingOptions = [
    { id: "standard", value: "Standard", name: "Standard" },
    { id: "express", value: "Express", name: "Express" },
    { id: "pickup", value: "Local Pickup", name: "Local Pickup" },
  ];

  const stockStatusOptions = [
    { id: "in_stock", value: "in_stock", name: "In Stock" },
    { id: "out_of_stock", value: "out_of_stock", name: "Out of Stock" },
    { id: "pre_order", value: "pre_order", name: "Pre-order" },
  ];

  const weightUnitOptions = [
    { id: "kg", value: "kg", name: "kg" },
    { id: "lb", value: "lb", name: "lb" },
  ];

  const dimensionUnitOptions = [
    { id: "cm", value: "cm", name: "cm" },
    { id: "inch", value: "inch", name: "inch" },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parentField, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [field]: value,
      },
    }));
  };

  const handleShippingMethodToggle = (updatedItems) => {
    const methodIds = updatedItems.map((item) => item.id);
    setFormData((prev) => ({
      ...prev,
      shipping_methods: methodIds,
    }));
  };

  const handleSubmit = () => {
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
          <Input
            label="SKU (Stock Keeping Unit)"
            value={formData.sku}
            onChangeText={(text) => handleChange("sku", text)}
            placeholder="PROD-12345"
            helperText="Unique identifier for inventory tracking"
          />

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
          <CustomFormMultiCheckBox
            header="Stock Status"
            items={stockStatusOptions}
            selectedItems={[
              stockStatusOptions.find(
                (opt) => opt.id === formData.stock_status
              ),
            ]}
            onToggle={(selected) =>
              handleChange("stock_status", selected[0]?.id || "")
            }
            multiSelect={false}
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
                <CustomFormMultiCheckBox
                  items={weightUnitOptions}
                  selectedItems={[
                    weightUnitOptions.find(
                      (opt) => opt.id === formData.weight.unit
                    ),
                  ]}
                  onToggle={(selected) =>
                    handleNestedChange("weight", "unit", selected[0]?.id || "")
                  }
                  multiSelect={false}
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

            <CustomFormMultiCheckBox
              header="Dimension Unit"
              items={dimensionUnitOptions}
              selectedItems={[
                dimensionUnitOptions.find(
                  (opt) => opt.id === formData.dimensions.unit
                ),
              ]}
              onToggle={(selected) =>
                handleNestedChange(
                  "dimensions",
                  "unit",
                  selected[0]?.id || ""
                )
              }
              multiSelect={false}
            />
          </View>

          {/* Shipping Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Methods</Text>
            <CustomFormMultiCheckBox
              items={shippingOptions}
              selectedItems={formData.shipping_methods.map((method) => ({
                id: method,
                name:
                  shippingOptions.find((opt) => opt.id === method)?.name ||
                  method,
                value: method,
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
