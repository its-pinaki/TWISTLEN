import { View, Text } from "react-native";
import React from "react";
import Button from "../../atoms/Button/Button";
import { Link } from "expo-router";

const HomePage = () => {
  return (
    <View>
      <Text>HomePage</Text>
      <Link href="/(productmanager)">Add Products To Your Store</Link>
      <Link href="/(fulfillmenttracker)">Track Your Orders</Link>
    </View>
  );
};

export default HomePage;
