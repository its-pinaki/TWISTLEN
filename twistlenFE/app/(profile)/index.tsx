import { usePageStore } from "@/stores/pageStores";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Animated, ScrollView } from "react-native";
import { rootUrl } from "@/constants/endPoints";
import ProfilePage from "@/components/src/organisms/ProfilePage/ProfilePage";
import Footer from "@/components/src/atoms/Footer/Footer";
import Header from "@/components/src/atoms/Header/Header";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* Fixed Header */}
      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}
      >
        <Header />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false} // Hide default indicator
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: -50,
          // paddingTop: 80, // Adjust this value based on your header height
        }}
        // Custom scroll indicator container
        scrollIndicatorInsets={{ right: 1 }} // Small margin from right edge
      >
        {/* Custom scroll indicator implementation */}
        <View
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 4,
            zIndex: 20,
          }}
        >
          <Animated.View
            style={{
              height: "100%",
              width: 10,
              backgroundColor: "rgba(0,0,0,0.5)", // Grey track
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Animated.View
              style={{
                width: 4,
                backgroundColor: "#000", // Black thumb
                borderRadius: 2,
              }}
            />
          </Animated.View>
        </View>

        <View style={{ transform: [{ scale: 0.8 }] }}>
          <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto" }}>
            <ProfilePage />
          </View>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
