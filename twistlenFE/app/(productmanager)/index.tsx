import { usePageStore } from "@/stores/pageStores";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { rootUrl } from "@/constants/endPoints";
import ProductManager from "@/components/src/organisms/ProductManager/ProductManager";

export default function ProductManagerScreen() {
  return (
    <View style={styles.container}>
      <ProductManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin:20
  },
});
