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
import ProductBasicDetailsForm from "./ProductBasicDetailsForm";
import ProductPricingForm from "./ProductPricingForm";
import ProductMediaForm from "./ProductMediaForm";
import ProductShippingForm from "./ProductShippingForm";
import ProductSEOMetadataForm from "./ProductSEOMetadataForm";
import Button from "../../atoms/Button/Button";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const ProductAddition = () => {
  const steps = [
    "Basic Details",
    "Price Details",
    "Media Details",
    "Shipping Details",
    "SEO Details",
  ];
  const icons = [
    <AntDesign name="infocirlceo" size={24} color="black" />,
    <Entypo name="price-tag" size={24} color="black" />,
    <MaterialIcons name="perm-media" size={24} color="black" />,
    <MaterialIcons name="local-shipping" size={24} color="black" />,
    <MaterialCommunityIcons
      name="store-search-outline"
      size={24}
      color="black"
    />,
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    basicDetails: {},
    pricing: {},
    media: {},
    shipping: {},
    seo: {},
  });

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
  const updateFormData = (step, data) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData.basicDetails,
      ...formData.pricing,
      ...formData.media,
      ...formData.shipping,
      ...formData.seo,
    };
    console.log("Final form data:", finalData);
    alert("Product submitted successfully!");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        {/* Stepper */}
        <View style={styles.stepperContainer}>
          <Stepper
            steps={steps}
            icons={icons}
            activeStep={activeStep}
            activeColor="#4CAF50"
            inactiveColor="#9E9E9E"
          />
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto" }}>
            {activeStep === 0 && (
              <ProductBasicDetailsForm
                initialData={formData.basicDetails}
                onSubmit={(data) => {
                  updateFormData("basicDetails", data);
                  handleNext();
                }}
              />
            )}
            {activeStep === 1 && (
              <ProductPricingForm
                initialData={formData.pricing}
                onSubmit={(data) => {
                  updateFormData("pricing", data);
                  handleNext();
                }}
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

        {/* Fixed Footer with Buttons */}
        <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto" }}>
          <View style={styles.footer}>
            {activeStep > 0 && (
              <Button
                title="Back"
                onPress={handlePrev}
                mode="outlined"
                style={styles.button}
              />
            )}
            <Button
              title={activeStep === steps.length - 1 ? "Submit" : "Next"}
              onPress={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
              mode="contained"
              style={styles.button}
            />
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for fixed footer
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  button: {
    // flex: 1,
    // marginHorizontal: 8,
  },
});

export default ProductAddition;
