import { usePageStore } from "@/stores/pageStores";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { rootUrl } from "@/constants/endPoints";
import Admin from "@/adminconfig/Admin";
import PreRegistration from "@/components/src/organisms/PreRegistration/PreRegistration";

export default function PreRegistrationScreen() {
  return (
    <View style={styles.container}>
      <PreRegistration />
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
