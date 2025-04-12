import React from "react";
import { View, Image, StyleSheet } from "react-native";

// Variants
// "right" - Image in circle, component aligned to right
// "bottom" - Image in rectangle, component aligned below
// "above" - Image and component positioned above image

type CustomImageProps = {
  source: any;
  size?: number; // Ensures circular shape for "right" variant
  borderWidth?: number;
  borderColor?: string;
  variant?: "right" | "bottom" | "above";
  children?: React.ReactNode;
  style?: object;
};

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  size = 80,
  borderWidth = 2,
  borderColor = "#000",
  variant = "right",
  children,
  style = {},
}) => {
  return (
    <View
      style={[
        styles.container,
        variant === "right" && styles.row,
        variant === "bottom" && styles.column,
        variant === "above" && styles.relative,
      ]}
    >
      {variant === "above" && children}
      <View
        style={[
          styles.imageContainer,
          {
            width: size,
            height: variant === "bottom" ? size * 1.2 : size, // Make it rectangular for bottom variant
            borderRadius: variant === "right" ? size / 2 : 10,
            borderWidth,
            borderColor,
          },
        ]}
      >
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: size - borderWidth * 2,
              height:
                variant === "bottom"
                  ? size * 1.2 - borderWidth * 2
                  : size - borderWidth * 2,
              borderRadius:
                variant === "right" ? (size - borderWidth * 2) / 2 : 10,
            },
            style,
          ]}
        />
      </View>
      {(variant === "right" || variant === "bottom") && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  relative: {
    position: "relative",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
  },
});

export default CustomImage;
