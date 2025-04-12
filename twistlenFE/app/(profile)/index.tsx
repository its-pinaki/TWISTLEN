import { usePageStore } from "@/stores/pageStores";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { rootUrl } from "@/constants/endPoints";
import ProfilePage from "@/components/src/organisms/ProfilePage/ProfilePage";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfilePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
