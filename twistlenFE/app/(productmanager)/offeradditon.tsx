import { usePageStore } from "@/stores/pageStores";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { rootUrl } from "@/constants/endPoints";
import OfferAddition from "@/components/src/organisms/OfferAddition/OfferAddition";

export default function ProductAdditionScreen() {
  return (
    <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto" }}>
      <OfferAddition />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
