import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TextInput, Text } from "react-native";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import CustomFormMultiCheckBox from "../../atoms/CustomFormMultiCheckBox/CustomFormMultiCheckBox";

const ProductSEOMetadataForm = ({ initialData = {}, onSubmit, onBack }) => {
  // Form state
  const [formData, setFormData] = useState({
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
    custom_fields: {},
    ...initialData,
  });

  // Custom field state
  const [newCustomField, setNewCustomField] = useState({
    key: "",
    value: "",
  });

  // Common keywords suggestions
  const keywordSuggestions = [
    { id: "1", value: "premium" },
    { id: "2", value: "quality" },
    { id: "3", value: "affordable" },
    { id: "4", value: "durable" },
    { id: "5", value: "eco-friendly" },
  ];

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle keywords toggle
  const handleKeywordToggle = (id) => {
    const keyword = keywordSuggestions.find((k) => k.id === id)?.value;
    if (!keyword) return;

    setFormData((prev) => {
      const keywords = [...prev.meta_keywords];
      const index = keywords.indexOf(keyword);

      if (index === -1) {
        keywords.push(keyword);
      } else {
        keywords.splice(index, 1);
      }

      return {
        ...prev,
        meta_keywords: keywords,
      };
    });
  };

  // Handle custom field changes
  const handleCustomFieldChange = (field, value) => {
    setNewCustomField((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add custom field
  const handleAddCustomField = () => {
    if (newCustomField.key && newCustomField.value) {
      setFormData((prev) => ({
        ...prev,
        custom_fields: {
          ...prev.custom_fields,
          [newCustomField.key]: newCustomField.value,
        },
      }));
      setNewCustomField({ key: "", value: "" });
    }
  };

  // Remove custom field
  const handleRemoveCustomField = (key) => {
    setFormData((prev) => {
      const custom_fields = { ...prev.custom_fields };
      delete custom_fields[key];
      return {
        ...prev,
        custom_fields,
      };
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Meta Title */}
      <Input
        label="Meta Title"
        value={formData.meta_title}
        onChangeText={(text) => handleChange("meta_title", text)}
        placeholder="Best Product for Your Needs"
        helperText="Title for search engines (50-60 characters recommended)"
        maxLength={60}
      />

      {/* Meta Description */}
      <Input
        label="Meta Description"
        value={formData.meta_description}
        onChangeText={(text) => handleChange("meta_description", text)}
        placeholder="Description of your product for search results"
        multiline
        numberOfLines={3}
        inputStyle={{ height: 80 }}
        helperText="Brief description for search results (150-160 characters recommended)"
        maxLength={160}
      />

      {/* Meta Keywords */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meta Keywords</Text>
        <Text style={styles.helperText}>Select relevant keywords for SEO</Text>

        <CustomFormMultiCheckBox
          items={keywordSuggestions}
          selectedItems={formData.meta_keywords.map((kw) => ({
            id: keywordSuggestions.find((k) => k.value === kw)?.id || "",
          }))}
          onToggle={handleKeywordToggle}
        />

        {/* Custom Keywords Input */}
        <Input
          label="Add Custom Keywords"
          value={formData.meta_keywords.join(", ")}
          onChangeText={(text) =>
            handleChange(
              "meta_keywords",
              text.split(",").map((k) => k.trim())
            )
          }
          placeholder="keyword1, keyword2, keyword3"
          helperText="Separate multiple keywords with commas"
        />
      </View>

      {/* Custom Fields */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Fields</Text>
        <Text style={styles.helperText}>
          Add additional metadata as key-value pairs
        </Text>

        <View style={styles.row}>
          <View style={styles.customFieldInput}>
            <Input
              label="Key"
              value={newCustomField.key}
              onChangeText={(text) => handleCustomFieldChange("key", text)}
              placeholder="color_variant"
            />
          </View>
          <View style={styles.customFieldInput}>
            <Input
              label="Value"
              value={newCustomField.value}
              onChangeText={(text) => handleCustomFieldChange("value", text)}
              placeholder="blue"
            />
          </View>
        </View>

        <Button
          title="Add Custom Field"
          onPress={handleAddCustomField}
          mode="outlined"
          style={{ marginTop: 10 }}
        />

        {/* Display existing custom fields */}
        {Object.entries(formData.custom_fields).map(([key, value]) => (
          <View key={key} style={styles.customFieldItem}>
            <Text style={styles.customFieldKey}>{key}:</Text>
            <Text style={styles.customFieldValue}>{value}</Text>
            <Button
              icon="delete"
              onPress={() => handleRemoveCustomField(key)}
              mode="text"
              compact
            />
          </View>
        ))}
      </View>
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
          title="Save SEO Metadata"
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
    paddingBottom: 0,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  customFieldInput: {
    flex: 1,
  },
  customFieldItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  customFieldKey: {
    fontWeight: "bold",
    marginRight: 5,
  },
  customFieldValue: {
    flex: 1,
    color: "#555",
  },
});

export default ProductSEOMetadataForm;
