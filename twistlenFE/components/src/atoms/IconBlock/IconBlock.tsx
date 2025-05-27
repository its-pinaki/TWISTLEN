import { View, Text } from "react-native";
import React from "react";
import * as Icons from "@expo/vector-icons";

type IconItem = {
  serviceType: keyof typeof Icons;
  iconName: string;
  size: number;
  color: string;
  noBorder?: boolean;
  label?: string;
  labelComponent?: React.ReactNode; // New
  style?: object;
  textStyle?: object;
  marginHorizontal?: number;
  marginVertical?: number;
  width?: number;
  height?: number;
  reverseLabel?: boolean;
};

type IconBlockProps = {
  icon: IconItem;
};

const IconBlock: React.FC<IconBlockProps> = ({ icon }) => {
  const IconComponent = Icons[icon?.serviceType] as any;

  if (!IconComponent) {
    console.warn(`Invalid serviceType: ${icon.serviceType}`);
    return null;
  }

  const Label = icon.labelComponent ? (
    icon.labelComponent
  ) : icon.label ? (
    <Text
      style={[
        {
          fontSize: icon.size,
          fontWeight: "bold",
          marginHorizontal: 5,
        },
        icon.textStyle,
      ]}
    >
      {icon.label}
    </Text>
  ) : null;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: icon.marginHorizontal,
          marginVertical: icon.marginVertical,
        },
        icon.style,
      ]}
    >
      {icon.reverseLabel && Label}
      <View
        style={[
          {
            borderRadius: 10,
            borderWidth: icon.noBorder ? 0 : 1,
            borderColor: icon.noBorder ? "transparent" : "#DFE6E9",
            padding: icon.noBorder ? 0 : 10,
            justifyContent: "center",
            alignItems: "center",
            ...(icon.label || icon.labelComponent
              ? {}
              : { width: icon?.width, height: icon?.height }),
          },
          icon.style,
        ]}
      >
        <IconComponent
          name={icon.iconName}
          size={icon.size}
          color={icon.color}
        />
      </View>
      {!icon.reverseLabel && Label}
    </View>
  );
};

export default IconBlock;
