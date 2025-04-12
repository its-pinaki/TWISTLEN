import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Link } from "expo-router";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingColor?: string;
  mode?: "contained" | "outlined" | "text";
  buttonColor?: string;
  textColor?: string;
  borderRadius?: number;
  horizontalPadding?: number;
  verticalPadding?: number;
  horizontalMargin?: number;
  verticalMargin?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  borderColor?: string;
  href?: string;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  loadingColor = "#ffffff",
  mode = "contained",
  buttonColor,
  textColor,
  borderRadius = 8,
  horizontalPadding = 16,
  verticalPadding = 10,
  horizontalMargin = 0,
  verticalMargin = 0,
  style = {},
  textStyle = {},
  borderColor = "",
  href,
}) => {
  const theme = useTheme();
  const backgroundColor =
    buttonColor ||
    (mode === "contained" ? theme.colors.primary : "transparent");
  const color =
    textColor || (mode === "contained" ? "white" : theme.colors.primary);
  const borderWidth = mode === "outlined" ? 1 : 0;

  const buttonStyle: ViewStyle = {
    backgroundColor,
    borderRadius,
    borderWidth,
    borderColor,
    paddingHorizontal: horizontalPadding,
    paddingVertical: verticalPadding,
    marginHorizontal: horizontalMargin,
    marginVertical: verticalMargin,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    ...style, // Merging external styles
  };

  const buttonText: TextStyle = {
    fontWeight: "bold",
    textAlign: "center",
    color,
    ...textStyle, // Merging external text styles
  };

  if (href) {
    return (
      <Link href={href} asChild>
        <TouchableOpacity disabled={disabled || loading} style={buttonStyle}>
          <Text style={buttonText}>
            {loading ? <ActivityIndicator color={loadingColor} /> : title}
          </Text>
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyle}
    >
      <Text style={buttonText}>
        {loading ? <ActivityIndicator color={loadingColor} /> : title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
