import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Input from "../../atoms/Input/Input";
import ToggleButton from "../../atoms/ToggleButton/ToggleButton";
import CustomDropDown from "../../atoms/CustomDropDown/CustomDropDown";
import CustomFormMultiCheckBox from "../../atoms/CustomFormMultiCheckBox/CustomFormMultiCheckBox";
import Button from "../../atoms/Button/Button";

const ProductBasicDetailsForm = ({ initialData = {}, onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    sub_category: "",
    tags: [],
    brand: "",
    status: "draft",
    ...initialData,
  });

  // Sample data for dropdowns
  const [categories, setCategories] = useState([
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Home & Kitchen" },
    { id: "4", name: "Books" },
  ]);

  const [subCategories, setSubCategories] = useState([
    { id: "1", name: "Smartphones", categoryId: "1" },
    { id: "2", name: "Laptops", categoryId: "1" },
    { id: "3", name: "Men", categoryId: "2" },
    { id: "4", name: "Women", categoryId: "2" },
  ]);

  const [brands, setBrands] = useState([
    { id: "1", name: "Apple" },
    { id: "2", name: "Samsung" },
    { id: "3", name: "Nike" },
    { id: "4", name: "Adidas" },
  ]);

  const [tags, setTags] = useState([
    { id: "1", name: "New" },
    { id: "2", name: "Popular" },
    { id: "3", name: "Sale" },
    { id: "4", name: "Limited Edition" },
  ]);

  // Filter subcategories based on selected category
  const filteredSubCategories = subCategories.filter(
    (subCat) => subCat.categoryId === formData.category?.id
  );

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      handleChange("slug", generatedSlug);
    }
  }, [formData.title]);

  // Handle form submission
  const handleSubmit = () => {
    // Prepare data for submission
    const submissionData = {
      ...formData,
      category: formData.category?.name || formData.category,
      sub_category: formData.sub_category?.name || formData.sub_category,
      brand: formData.brand?.name || formData.brand,
      tags: formData.tags.map((tag) => tag.name),
    };

    onSubmit(submissionData);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={{ marginBottom: 20 }}>
        {/* Title */}
        <Input
          label="Product Title"
          value={formData.title}
          onChangeText={(text) => handleChange("title", text)}
          placeholder="Enter product title"
          helperText="This will be displayed as the product name"
        />

        {/* Slug */}
        <Input
          label="Product Slug"
          value={formData.slug}
          onChangeText={(text) => handleChange("slug", text)}
          placeholder="product-url-identifier"
          helperText="URL-friendly identifier for the product"
          leftIcon="link"
        />

        {/* Description */}
        <Input
          label="Description"
          value={formData.description}
          onChangeText={(text) => handleChange("description", text)}
          placeholder="Enter detailed product description"
          multiline
          numberOfLines={4}
          inputStyle={{ height: 100 }}
        />

        {/* Category Dropdown */}
        <CustomDropDown
          value={categories}
          onSelect={(selected) => handleChange("category", selected[0])}
          uniqueKey="id"
          displayName="name"
          selectedItems={formData.category ? [formData.category] : []}
          single={true}
          setSelectedItems={(selected) => handleChange("category", selected[0])}
          texttype="Category"
          searchPlaceholder="Search categories..."
          isError={false}
        />

        {/* Sub-Category Dropdown */}
        {formData.category && (
          <CustomDropDown
            value={filteredSubCategories}
            onSelect={(selected) => handleChange("sub_category", selected[0])}
            uniqueKey="id"
            displayName="name"
            selectedItems={formData.sub_category ? [formData.sub_category] : []}
            single={true}
            setSelectedItems={(selected) =>
              handleChange("sub_category", selected[0])
            }
            texttype="Sub-Category"
            searchPlaceholder="Search sub-categories..."
            isError={false}
          />
        )}

        {/* Brand Dropdown */}
        <CustomDropDown
          value={brands}
          onSelect={(selected) => handleChange("brand", selected[0])}
          uniqueKey="id"
          displayName="name"
          selectedItems={formData.brand ? [formData.brand] : []}
          single={true}
          setSelectedItems={(selected) => handleChange("brand", selected[0])}
          texttype="Brand"
          searchPlaceholder="Search brands..."
          isError={false}
        />

        {/* Tags Multi-Select */}
        <CustomFormMultiCheckBox
          items={tags}
          header="Tags"
          selectedItems={formData.tags}
          onToggle={(id) => {
            const selectedTag = tags.find((tag) => tag.id === id);
            const isSelected = formData.tags.some((tag) => tag.id === id);

            if (isSelected) {
              handleChange(
                "tags",
                formData.tags.filter((tag) => tag.id !== id)
              );
            } else {
              handleChange("tags", [...formData.tags, selectedTag]);
            }
          }}
        />

        {/* Status Toggle */}
        <ToggleButton
          options={["draft", "published", "archived"]}
          onToggle={(selected) => handleChange("status", selected)}
          initialSelected={formData.status}
          style={{ marginVertical: 15 }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    
          {/* Submit Button */}
          <Button
            title="Save Product"
            onPress={handleSubmit}
            mode="contained"
            style={{ marginTop: 20 }}
          />
        </View>
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
});

export default ProductBasicDetailsForm;
