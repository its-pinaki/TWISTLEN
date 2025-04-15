import { useLocalSearchParams } from "expo-router";
import { Text, View, ScrollView } from "react-native";
import ProductCard from "@/components/src/molecules/ProductCard/ProductCard";

const ProductScreen = () => {
  const { productId, ref, refv1 } = useLocalSearchParams();

  return (
    <View style={{ $$css: true, _: "flex-1" }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        {/* Outer container with max-width */}
        <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto px-4" }}>
          <Text>{productId}</Text>
          <Text>{ref}</Text>
          <Text>{refv1}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;
