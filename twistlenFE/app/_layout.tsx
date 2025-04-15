import { useEffect } from "react";
import "../global.css";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function RootLayout() {
  // useEffect(() => {
  //   if (Platform.OS === "web") {
  //     document.body.style.transform = "scale(0.9)";
  //     document.body.style.transformOrigin = "top center";
  //   }
  // }, []);
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false, // Option to hide header
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(admin)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(plp)" />
    </Stack>
  );
}
