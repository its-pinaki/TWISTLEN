import { useLocalSearchParams } from "expo-router";
import { Text, View, ScrollView } from "react-native";
import ProductCard from "@/components/src/molecules/ProductCard/ProductCard";

const ProductScreen = () => {
  const { productId, ref, refv1 } = useLocalSearchParams();

  return (
    <View style={{ $$css: true, _: "w-full max-w-screen-xl mx-auto p-4" }}>
      <ScrollView>
        <View
          style={{
            $$css: true,
            _: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          }}
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;
