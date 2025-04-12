import '../global.css';
import { Stack } from "expo-router";

export default function RootLayout() {
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
