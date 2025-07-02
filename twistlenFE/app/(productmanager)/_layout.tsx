import { Stack } from "expo-router";

export default function ProductManagerLayout() {
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
        headerShown: false,
      }}
    >
      <Stack.Screen name="index"  />
      <Stack.Screen name="productaddition"  />
    </Stack>
  );
}
