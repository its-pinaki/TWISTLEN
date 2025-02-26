// import { GestureResponderEvent, Platform } from "react-native";

interface CardProps {
  title: string;
  description: string;
}
let Card: React.FC<CardProps>;

// if (Platform.OS === "web") {
//   Card = require("./Card.web").default;
// } else {
//   Card = require("./Card.native").default;
// }

Card = require("./Card.web").default;

export default Card;
