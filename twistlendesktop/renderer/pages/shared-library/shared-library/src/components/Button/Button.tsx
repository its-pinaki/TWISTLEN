import { GestureResponderEvent, Platform } from "react-native";

interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}
let Button: React.FC<ButtonProps>;

if (Platform.OS === "web") {
  Button = require("./Button.web").default;
} else {
  Button = require("./Button.native").default;
}

export default Button;
