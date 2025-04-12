import React from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";

type CustomImageProps = {
  source: ImageSourcePropType;
  width?: number | string;
  height?: number | string;
  borderWidth?: number;
  borderColor?: string;
  shape?: "circle" | "rectangle";
  overlayComponent?: React.ReactNode;
  children?: React.ReactNode;
  style?: object;
};

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  width = 100,
  height = 100,
  borderWidth = 0,
  borderColor = "#000",
  shape = "rectangle",
  overlayComponent,
  children,
  style = {},
}) => {
  const isCircle = shape === "circle";
  const borderRadius = isCircle ? Number(width) / 2 : 10;

  return (
    <View style={[styles.container, { width, height }]}>
      <View
        style={[
          styles.imageContainer,
          {
            width,
            height,
            borderRadius,
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
              width: "100%",
              height: "100%",
              borderRadius,
            },
            style,
          ]}
          resizeMode="cover" // Or 'contain' if you prefer no cropping
        />

        {overlayComponent && <View style={styles.overlay}>{overlayComponent}</View>}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover", // Keep aspect ratio but fill container, can crop
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default CustomImage;
