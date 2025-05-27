import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Stepper from "../../atoms/Stepper/Stepper";
import Input from "../../atoms/Input/Input";
import ProductBasicDetailsForm from "./ProductBasicDetailsForm";
import ProductPricingForm from "./ProductPricingForm";
import ProductMediaForm from "./ProductMediaForm";
import ProductShippingForm from "./ProductShippingForm";
import ProductSEOMetadataForm from "./ProductSEOMetadataForm";
import Button from "../../atoms/Button/Button";
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const ProductAddition = () => {
  const steps = [
    "Basic Details",
    "Price Details",
    "Media Details",
    "Shipping Details",
    "Seo Details",
  ];
  const icons=[
    <AntDesign name="infocirlceo" size={24} color="black" />,
    <Entypo name="price-tag" size={24} color="black" />,
    <MaterialIcons name="perm-media" size={24} color="black" />,
    <MaterialIcons name="local-shipping" size={24} color="black" />,
    <MaterialCommunityIcons name="store-search-outline" size={24} color="black" />,
  ]
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const dummyProductData = {
    title: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    category: { id: "1", name: "Electronics" },
    sub_category: { id: "2", name: "Audio" },
    tags: [
      { id: "1", name: "New" },
      { id: "3", name: "Sale" },
    ],
    brand: { id: "1", name: "Sony" },
    status: "published",
  };

  const dummyPricingData = {
    price: 99.99,
    discount_price: 79.99,
    currency: "USD",
    tax_included: true,
    tax_percentage: 8.25,
  };

  const dummyMediaData = {
    images: [
      "https://picsum.photos/300/200?random=1",
      "https://picsum.photos/300/200?random=2",
    ],
    thumbnail: "https://picsum.photos/300/200?random=1",
    video_url: "https://example.com/product-video.mp4",
    gallery_description: "Premium product with multiple color options",
  };

  const dummyShippingData = {
    sku: "PROD-12345",
    stock_quantity: 100,
    stock_status: "in_stock",
    weight: {
      value: 0.5,
      unit: "kg",
    },
    dimensions: {
      length: 20,
      width: 15,
      height: 10,
      unit: "cm",
    },
    shipping_methods: ["standard", "express"],
    origin_location: "United States",
  };

  const dummySEOData = {
    meta_title: "Premium Wireless Headphones - Best Sound Quality",
    meta_description:
      "Experience crystal clear sound with our premium wireless headphones. Noise cancellation and 30-hour battery life.",
    meta_keywords: ["premium", "quality", "wireless"],
    custom_fields: {
      "og:image": "https://example.com/images/headphones.jpg",
      "twitter:card": "summary_large_image",
    },
  };

  const handleSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
    alert("Form submitted successfully! Check console for data.");
  };

  const handlePriceSubmit = (formData) => {
    console.log("Pricing submitted:", formData);
    alert("Pricing saved! Check console for data.");
  };

  const handleMediaSubmit = (formData) => {
    console.log("Media submitted:", formData);
    alert("Media saved! Check console for data.");
  };

  const handleShippingDetailsSubmit = (formData) => {
    console.log("Shipping details submitted:", formData);
    alert("Shipping details saved! Check console for data.");
  };

  const handleSeoDetailsSubmit = (formData) => {
    console.log("SEO Metadata submitted:", formData);
    alert("SEO Metadata saved! Check console for data.");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={styles.keyboardView}
      >
        <View style={styles.stepperContainer}>
          <Stepper
            steps={steps}
            icons={icons}
            activeStep={activeStep}
            activeColor="#4CAF50"
            inactiveColor="#9E9E9E"
          />
        </View>

        <ScrollView
          // style={styles.scrollView}
          // contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {activeStep === 0 && (
              <ProductBasicDetailsForm
                initialData={dummyProductData}
                onSubmit={handleNext}
              />
            )}
            {activeStep === 1 && (
              <ProductPricingForm
                initialData={dummyPricingData}
                onSubmit={handleNext}
                onBack={handlePrev}
              />
            )}
            {activeStep === 2 && (
              <ProductMediaForm
                initialData={dummyMediaData}
                onSubmit={handleNext}
                onBack={handlePrev}
              />
            )}
            {activeStep === 3 && (
              <ProductShippingForm
                initialData={dummyShippingData}
                onSubmit={handleNext}
                onBack={handlePrev}
              />
            )}
            {activeStep === 4 && (
              <ProductSEOMetadataForm
                initialData={dummySEOData}
                onSubmit={handleSubmit}
                onBack={handlePrev}
              />
            )}
          </View>
        </ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <Button
            title="Back"
            // onPress={onBack}
            mode="contained"
            style={{ marginTop: 20 }}
          />
          {/* Submit Button */}
          <Button
            title="Save Media"
            // onPress={handleSubmit}
            mode="contained"
            style={{ marginTop: 20 }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  stepperContainer: {
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  // scrollView: {
  //   flex: 1,
  //   paddingBottom: 120,
  // },
  // scrollContent: {
  //   flexGrow: 1,
  //   paddingBottom: 120,
  // },
  formContainer: {
    paddingHorizontal: 16,
  },
});

export default ProductAddition;
