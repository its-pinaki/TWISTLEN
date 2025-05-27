import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    // Using setTimeout to ensure the redirect happens after the component mounts
    const timer = setTimeout(() => {
      // router.replace("/(admin)");
      // router.replace("/(tools)?tool=StartupIdeaGenerator");
      // router.replace("/(plp)");
      router.replace("/(profile)");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>
        Brewing up something awesome... Hold tight while we teleport you to the
        tools panel!
      </Text>
    </View>
  );
}

// <View style={styles.container}>
//   <Text>Hi This is Home</Text>
//   <Link href="/(admin)">View Admin Screen</Link>
//   <Link href="/(auth)">View Auth Screen</Link>
//   <Link href="/(plp)">View Plp Screen</Link>
//   <Link href="/(profile)">View Profile Screen</Link>
//   <Link href="/(home)">View Home Screen</Link>
//   <Link href="/products/1?ref=123&refv1=23">View Product Screen</Link>
//   <Link href="/(order)/order-checkout">View Checkout Screen</Link>
// </View>
