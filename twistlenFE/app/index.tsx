import { usePageStore } from "@/stores/pageStores";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { rootUrl } from "@/constants/endPoints";
import Admin from "@/adminconfig/Admin";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Hi This is Home</Text>
      <Link href="/(admin)">View Admin Screen</Link>
      <Link href="/(auth)">View Auth Screen</Link>
      <Link href="/(plp)">View Plp Screen</Link>
      <Link href="/(profile)">View Profile Screen</Link>
      <Link href="/(home)">View Home Screen</Link>
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
