import { usePageStore } from "@/stores/pageStores";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { rootUrl } from "@/constants/endPoints";
import Admin from "@/adminconfig/Admin";
import ProductListPage from "@/components/src/organisms/ProductListPage/ProductListPage";
import CheckOut from "@/components/src/organisms/CheckOut/CheckOut";

export default function OrderCheckoutScreen() {
  return (
    <View
      style={{
        $$css: true,
        _: "flex justify-between flex-col md:flex-row",
      }}
    >
      <CheckOut />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
