import { usePageStore } from "@/stores/pageStores";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { rootUrl } from "@/constants/endPoints";
import ProductAddition from "@/components/src/organisms/ProductAddition/ProductAddition";

export default function ProductAdditionScreen() {
  return <ProductAddition />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
