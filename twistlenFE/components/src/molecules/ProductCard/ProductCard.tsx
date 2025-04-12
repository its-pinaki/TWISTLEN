import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Button from "../../atoms/Button/Button";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import Typography from "../../atoms/Typography/Typography";

// Enable layout animation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ProductCard = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.card}>
      {/* Header Image with Overlay Text */}
      <ImageBackground
        source={{ uri: "https://picsum.photos/200" }}
        style={styles.image}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      >
        <View style={styles.overlayTextContainer}>
          <Button
            title={"Trending"}
            textColor="white"
            buttonColor="#EF4444"
            verticalPadding={2}
            horizontalPadding={10}
            borderRadius={50}
            textStyle={{
              fontSize: 14,
              fontWeight: "regular",
              fontFamily: "Inter",
            }}
          />
        </View>
      </ImageBackground>
      <View
        style={{ $$css: true, _: "flex flex-row justify-between mx-4 mt-2" }}
      >
        <Button
          title={"Premium Course"}
          textColor="#2563EB"
          buttonColor="#DBEAFE"
          verticalPadding={4}
          horizontalPadding={15}
          borderRadius={50}
          textStyle={{
            fontSize: 14,
            fontWeight: "regular",
            fontFamily: "Inter",
          }}
        />
        <IconBlock
          icon={{
            serviceType: "AntDesign",
            iconName: "star",
            size: 18,
            color: "#FBBF24",
            label: "4.5",
            noBorder: true,
            textStyle: {
              fontSize: 16,
              fontWeight: "regular",
              fontFamily: "Inter",
            },
          }}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Typography
          text={"The $100M Offer Formula"}
          fontSize={20}
          fontWeight={"bold"}
          style={{ fontFamily: "Inter" }}
        />
        <Typography
          text={
            "Create irresistible offers that convert at 20%+ (Even in cold traffic)"
          }
          fontSize={16}
          fontWeight={"normal"}
          style={{ fontFamily: "Inter" }}
          color="#4B5563"
        />
      </View>

      <View style={{ $$css: true, _: "flex flex-row justify-between m-2" }}>
        <View style={{ $$css: true, _: "flex flex-row items-end" }}>
          <Typography
            text={"$299"}
            fontSize={30}
            fontWeight={"bold"}
            style={{ fontFamily: "Inter" }}
            color="#000000"
          />
          <Typography
            text={"$99"}
            fontSize={16}
            fontWeight={"normal"}
            color="#4B5563"
            style={{ fontFamily: "Inter", $$css: true, _: "line-through ml-2" }}
          />
        </View>
        <Typography
          text={"Save 67%"}
          fontSize={16}
          fontWeight={600}
          style={{ fontFamily: "Inter" }}
          color="#10B981"
        />
      </View>
      {/* Collapsible Section */}
      {expanded && (
        <View style={styles.collapsibleContent}>
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "check",
              size: 18,
              color: "#10B981",
              label: "Complete Offer Creation System",
              style: { $$css: true, _: "my-1" },
              noBorder: true,
              textStyle: {
                fontSize: 16,
                fontWeight: "regular",
                fontFamily: "Inter",
              },
            }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "check",
              size: 18,
              color: "#10B981",
              label: "Value Stack Framework",
              noBorder: true,
              style: { $$css: true, _: "my-1" },
              textStyle: {
                fontSize: 16,
                fontWeight: "regular",
                fontFamily: "Inter",
              },
            }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "check",
              size: 18,
              color: "#10B981",
              label: "Sales Script Templates",
              noBorder: true,
              style: { $$css: true, _: "my-1" },
              textStyle: {
                fontSize: 16,
                fontWeight: "regular",
                fontFamily: "Inter",
              },
            }}
          />
        </View>
      )}

      {/* Toggle Button */}
      <TouchableOpacity onPress={toggleExpand} style={styles.toggleButton}>
        <Text style={styles.toggleText}>
          {expanded ? "Show Less" : "Show More"}
        </Text>
        <AntDesign name={expanded ? "up" : "down"} size={16} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    height: 180,
    justifyContent: "flex-start",
    padding: 16,
  },
  overlayTextContainer: {
    // backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-end",
  },
  overlayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
  },
  collapsibleContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: "#444",
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  toggleText: {
    fontSize: 14,
    marginRight: 6,
    color: "gray",
  },
});
