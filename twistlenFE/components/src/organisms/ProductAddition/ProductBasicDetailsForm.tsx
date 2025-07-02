import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Input from "../../atoms/Input/Input";
import ToggleButton from "../../atoms/ToggleButton/ToggleButton";
import CustomDropDown from "../../atoms/CustomDropDown/CustomDropDown";
import CustomFormMultiCheckBox from "../../atoms/CustomFormMultiCheckBox/CustomFormMultiCheckBox";
import Button from "../../atoms/Button/Button";
import TagInput from "../../atoms/TagInput/TagInput";

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

  const [selected, setSelected] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Handler for checkbox toggle
  const handleToggle = (id, value) => {
    setSelectedTags((prev) => {
      // If item already selected, remove it
      if (prev.some((item) => item.id === id)) {
        return prev.filter((item) => item.id !== id);
      }
      // Otherwise add it
      return [...prev, { id, value }];
    });
  };

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
    <View>
      <ScrollView
        // style={styles.scrollView}
        // contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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
          <View
            style={{
              $$css: true,
              _: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5",
            }}
          >
            {/* Category Dropdown */}
            <CustomDropDown
              value={categories}
              onSelect={(selected) => handleChange("category", selected[0])}
              uniqueKey="id"
              displayName="name"
              selectedItems={formData.category ? [formData.category] : []}
              single={true}
              setSelectedItems={(selected) =>
                handleChange("category", selected[0])
              }
              texttype="Category"
              searchPlaceholder="Search categories..."
              isError={false}
              title="Select Category"
            />

            {/* Sub-Category Dropdown */}
            {formData.category && (
              <CustomDropDown
                value={filteredSubCategories}
                onSelect={(selected) =>
                  handleChange("sub_category", selected[0])
                }
                uniqueKey="id"
                displayName="name"
                selectedItems={
                  formData.sub_category ? [formData.sub_category] : []
                }
                single={true}
                setSelectedItems={(selected) =>
                  handleChange("sub_category", selected[0])
                }
                texttype="Sub-Category"
                searchPlaceholder="Search sub-categories..."
                isError={false}
                title="Select SubCategory"
              />
            )}
          </View>

          {/* Tags Multi-Select */}
          <View
            style={{
              $$css: true,
              _: "my-2",
            }}
          >
            <CustomFormMultiCheckBox
              items={[
                { id: 1, name: "Drafted", value: "Drafted" },
                { id: 2, name: "Published", value: "Published" },
                { id: 3, name: "Archieved", value: "Archieved" },
              ]}
              selectedItems={selected}
              onToggle={setSelected}
              multiSelect={true} // ⬅️ change to true for multi-select
            />
          </View>

          <TagInput onTagsChange={(tags) => console.log(tags)} />
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
    paddingBottom: 30,
  },
});

export default ProductBasicDetailsForm;
