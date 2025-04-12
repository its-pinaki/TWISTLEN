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
  style?: object;
  textStyle?: object;
  marginHorizontal?: number;
  marginVertical?: number;
  width?:number,
  height?:number
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

  return (
    <View style={[{ flexDirection: "row", alignItems: "center", marginHorizontal: icon.marginHorizontal, marginVertical: icon.marginVertical }, icon.style]}>
      <View
        style={[
          {
            borderRadius: 10,
            borderWidth: icon.noBorder ? 0 : 1,
            borderColor: icon.noBorder ? "transparent" : "#DFE6E9",
            justifyContent: "center",
            alignItems: "center",
            ...(icon.label ? {} : { width: icon?.width, height: icon?.height }),
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
      {icon.label && (
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
      )}
    </View>
  );
};

export default IconBlock;
