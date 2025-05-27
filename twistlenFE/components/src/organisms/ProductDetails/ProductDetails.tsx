import React from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Button from "../../atoms/Button/Button";
import Typography from "../../atoms/Typography/Typography";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import * as Icons from "@expo/vector-icons";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import ThreadedDiscussion from "../../molecules/DiscussionThreads/ThreadedDiscussion";
import OfferSections from "../../molecules/OfferSections/OfferSections";

const ProductDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          $$css: true,
          _: "flex-col md:flex-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-5 bg-white rounded-lg p-3",
        }}
      >
        <View>
          <ImageBackground
            source={{ uri: "https://picsum.photos/300" }}
            style={styles.imageContainer}
            imageStyle={styles.image}
          >
            {/* Rating Badge (Top Left) */}
            <View style={[styles.badge, styles.ratingBadge]}>
              <IconBlock
                icon={{
                  serviceType: "FontAwesome",
                  iconName: "star",
                  size: 14,
                  color: "#FFD700",
                  noBorder: true,
                  label: "4,145 reviews",
                  textStyle: {
                    fontSize: 12,
                    fontWeight: "normal",
                    color: "#374151",
                  },
                }}
              />
            </View>

            <View style={[styles.badge, styles.leftAlign]}>
              <IconBlock
                icon={{
                  serviceType: "Entypo",
                  iconName: "shopping-cart",
                  size: 14,
                  color: "#EC4899",
                  noBorder: true,
                  label: "23 items in cart",
                  textStyle: {
                    fontSize: 12,
                    fontWeight: "normal",
                    color: "#374151",
                  },
                }}
              />
            </View>
            <View style={[styles.badge, styles.rightAlign]}>
              <IconBlock
                icon={{
                  serviceType: "MaterialCommunityIcons",
                  iconName: "package-variant-closed",
                  size: 14,
                  color: "#10B981",
                  noBorder: true,
                  label: "23 items delivered",
                  textStyle: {
                    fontSize: 12,
                    fontWeight: "normal",
                    color: "#374151",
                  },
                }}
              />
            </View>
          </ImageBackground>
          <View
            style={{
              $$css: true,
              _: "flex flex-row items-center gap-2 mt-2",
            }}
          >
            <ImageBackground
              source={{ uri: "https://picsum.photos/300" }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                backgroundColor: "black",
              }}
              imageStyle={{
                height: 50,
                width: 50,
                resizeMode: "contain",
                borderRadius: 8,
                backgroundColor: "black",
              }}
            ></ImageBackground>
            <ImageBackground
              source={{ uri: "https://picsum.photos/300" }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                backgroundColor: "black",
              }}
              imageStyle={{
                height: 50,
                width: 50,
                resizeMode: "contain",
                borderRadius: 8,
                backgroundColor: "black",
              }}
            ></ImageBackground>
            <ImageBackground
              source={{ uri: "https://picsum.photos/300" }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                backgroundColor: "black",
              }}
              imageStyle={{
                height: 50,
                width: 50,
                resizeMode: "contain",
                borderRadius: 8,
                backgroundColor: "black",
              }}
            ></ImageBackground>
          </View>
        </View>
        <View>
          {/* 1. Product Hero Section */}
          <View style={styles.heroSection}>
            <Typography
              text="Radiant Renewal Organic Face Cream"
              fontSize={25}
              color="#11827"
              fontWeight="bold"
            />
            <View style={styles.priceSection}>
              <View style={styles.ratingContainer}>
                <IconBlock
                  icon={{
                    serviceType: "FontAwesome",
                    iconName: "star",
                    size: 16,
                    color: "#FFD700",
                    noBorder: true,
                    label: "4,145 reviews",
                    textStyle: { fontSize: 14, fontWeight: "normal" },
                  }}
                />
              </View>
              <Typography
                text="$189"
                fontSize={24}
                fontWeight="bold"
                style={styles.price}
              />
            </View>
          </View>

          {/* 2. Color & Size Selector */}
          <View style={styles.selectorSection}>
            <Typography text="Color" fontWeight="bold" />
            <View style={styles.optionContainer}>
              {["Black", "White", "Red"].map((color) => (
                <Button
                  key={color}
                  title={color}
                  mode="outlined"
                  borderRadius={20}
                  horizontalPadding={12}
                  verticalPadding={6}
                  style={styles.optionButton}
                />
              ))}
            </View>

            <Typography
              text="Size"
              fontWeight="bold"
              style={styles.sizeLabel}
            />
            <View style={styles.optionContainer}>
              {["S", "M", "L", "XL"].map((size) => (
                <Button
                  key={size}
                  title={size}
                  mode="outlined"
                  borderRadius={20}
                  horizontalPadding={12}
                  verticalPadding={6}
                  style={styles.optionButton}
                />
              ))}
            </View>
          </View>

          {/* 3. Delivery Info */}
          <View style={styles.deliverySection}>
            <IconBlock
              icon={{
                serviceType: "Feather",
                iconName: "truck",
                size: 18,
                color: "#333",
                noBorder: true,
                label: "Delivery between 14th July to 30th July",
                textStyle: { fontSize: 14 },
              }}
            />
          </View>

          {/* 4. CTA Buttons */}
          <View style={styles.buttonSection}>
            <Button
              title="Add to Cart"
              mode="contained"
              buttonColor="#000"
              textColor="#FFF"
              borderRadius={8}
              style={styles.cartButton}
            />
            <Button
              title="Order Now"
              mode="outlined"
              borderColor="#000"
              borderRadius={8}
              style={styles.orderButton}
            />
          </View>
        </View>
      </View>

      {/* Product Description */}
      <View
        style={{
          $$css: true,
          _: "flex-col md:flex-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 ",
        }}
      >
        <View style={{ $$css: true, _: "bg-white rounded-lg px-3 py-5 my-2" }}>
          <Typography
            text="Why You Buy It Today"
            fontSize={20}
            color="#111827"
            fontWeight="bold"
            style={{ marginVertical: 10 }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "checkcircle",
              size: 18,
              color: "#10B981",
              noBorder: true,
              label: "Add two creams to your cart and save instantly.",
              textStyle: {
                fontSize: 18,
                fontWeight: "400",
                color: "#374151",
              },
              marginVertical: 5,
            }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "checkcircle",
              size: 18,
              color: "#10B981",
              noBorder: true,
              label: "No minimum purchase—delivered to your door fast & free.",
              textStyle: {
                fontSize: 18,
                fontWeight: "400",
                color: "#374151",
              },
              marginVertical: 5,
            }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "checkcircle",
              size: 18,
              color: "#10B981",
              noBorder: true,
              label: "with 20% more volume—same price!",
              textStyle: {
                fontSize: 18,
                fontWeight: "400",
                color: "#374151",
              },
              marginVertical: 5,
            }}
          />
        </View>
        <View style={{ $$css: true, _: "bg-white rounded-lg px-3 py-5 my-2" }}>
          <Typography
            text="Why You Will Love It"
            fontSize={20}
            color="#111827"
            fontWeight="bold"
            style={{ marginVertical: 10 }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "checkcircle",
              size: 18,
              color: "#10B981",
              noBorder: true,
              label: "Hydrates for 24 hours—no more dry, flaky skin!",
              textStyle: {
                fontSize: 18,
                fontWeight: "400",
                color: "#374151",
              },
              marginVertical: 5,
            }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "checkcircle",
              size: 18,
              color: "#10B981",
              noBorder: true,
              label: "Soothes irritation and redness for a healthy glow.",
              textStyle: {
                fontSize: 18,
                fontWeight: "400",
                color: "#374151",
              },
              marginVertical: 5,
            }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "checkcircle",
              size: 18,
              color: "#10B981",
              noBorder: true,
              label: "Eco-friendly, cruelty-free, and safe for sensitive skin.",
              textStyle: {
                fontSize: 18,
                fontWeight: "400",
                color: "#374151",
              },
              marginVertical: 5,
            }}
          />
        </View>
      </View>
      <Typography text="Offers" fontWeight="bold" fontSize={18} />
      {/* Offer Section */}
      <View
        style={{
          $$css: true,
          _: "flex-col md:flex-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
        }}
      >
        <OfferSections />
        <OfferSections />
        <OfferSections />
      </View>
      {/* Discussion Threads */}
      <View
        style={{
          $$css: true,
          _: "bg-white rounded-lg p-3",
        }}
      >
        <Typography text="Discussion Threads" fontWeight="bold" fontSize={18} />
        <ThreadedDiscussion />
      </View>
      {/* Customer Also Bought */}
      <Typography
        text="Customer Also Bought"
        fontSize={20}
        color="#111827"
        fontWeight="bold"
        style={{ marginVertical: 10 }}
      />
      <View
        style={{
          $$css: true,
          _: "flex-col md:flex-row grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2 ",
        }}
      >
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFF",
    padding: 16,
  },
  heroSection: {
    marginBottom: 5,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  priceSection: {
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  price: {
    marginTop: 2,
  },
  selectorSection: {
    marginVertical: 0,
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
    gap: 8,
  },
  optionButton: {
    marginRight: 8,
    marginBottom: 8,
  },
  sizeLabel: {
    marginTop: 5,
  },
  deliverySection: {
    marginVertical: 5,
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
  },
  buttonSection: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 5,
  },
  cartButton: {
    flex: 1,
  },
  orderButton: {
    flex: 1,
  },
  section: {
    marginVertical: 16,
  },
  descriptionText: {
    marginTop: 8,
    lineHeight: 22,
  },
  bundleButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 0,
    marginTop: 8,
  },
  imageContainer: {
    height: 300,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#E0F7FA",
    marginRight: 10,
    overflow: "hidden", // Ensures badges stay within rounded corners
    position: "relative", // For absolute positioning of badges
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  badge: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  ratingBadge: {
    top: 12,
    left: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  leftAlign: {
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  rightAlign: {
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  badgeTextContainer: {
    marginLeft: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
});

export default ProductDetails;
