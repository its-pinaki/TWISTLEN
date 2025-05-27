import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Input from "../../atoms/Input/Input";
import ToggleButton from "../../atoms/ToggleButton/ToggleButton";
import Button from "../../atoms/Button/Button";
const ProductPricingForm = ({ initialData = {}, onSubmit, onBack }) => {
  // Form state
  const [formData, setFormData] = useState({
    price: "",
    discount_price: "",
    currency: "USD",
    tax_included: false,
    tax_percentage: "",
    ...initialData,
  });

  // Currency options
  const currencyOptions = ["USD", "EUR", "GBP", "JPY", "INR", "AUD"];

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Convert numeric fields to numbers
    const submissionData = {
      ...formData,
      price: Number(formData.price),
      discount_price: formData.discount_price
        ? Number(formData.discount_price)
        : null,
      tax_percentage: formData.tax_percentage
        ? Number(formData.tax_percentage)
        : null,
    };

    onSubmit(submissionData);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Price */}
      <Input
        label="Base Price"
        value={formData.price.toString()}
        onChangeText={(text) =>
          handleChange("price", text.replace(/[^0-9.]/g, ""))
        }
        placeholder="0.00"
        keyboardType="numeric"
        leftIcon="currency-usd"
        helperText="The base price of the product"
      />

      {/* Discount Price */}
      <Input
        label="Discount Price (Optional)"
        value={formData.discount_price?.toString() || ""}
        onChangeText={(text) =>
          handleChange("discount_price", text.replace(/[^0-9.]/g, ""))
        }
        placeholder="0.00"
        keyboardType="numeric"
        leftIcon="sale"
        helperText="Special offer price if applicable"
      />

      {/* Currency */}
      <ToggleButton
        options={currencyOptions}
        onToggle={(selected) => handleChange("currency", selected)}
        initialSelected={formData.currency}
        style={{ marginVertical: 10 }}
        textStyle={{ fontSize: 14 }}
      />

      {/* Tax Included Toggle */}
      <View style={styles.taxContainer}>
        <ToggleButton
          options={["Tax Excluded", "Tax Included"]}
          onToggle={(selected) =>
            handleChange("tax_included", selected === "Tax Included")
          }
          initialSelected={
            formData.tax_included ? "Tax Included" : "Tax Excluded"
          }
          style={{ marginVertical: 10 }}
        />
      </View>

      {/* Tax Percentage (conditionally shown) */}
      {formData.tax_included && (
        <Input
          label="Tax Percentage (Optional)"
          value={formData.tax_percentage?.toString() || ""}
          onChangeText={(text) =>
            handleChange("tax_percentage", text.replace(/[^0-9.]/g, ""))
          }
          placeholder="0"
          keyboardType="numeric"
          leftIcon="percent"
          helperText="Tax percentage included in price"
          rightIcon="information"
        />
      )}
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
          title="Save Pricing"
          onPress={handleSubmit}
          mode="contained"
          style={{ marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  taxContainer: {
    marginVertical: 10,
  },
});

export default ProductPricingForm;
