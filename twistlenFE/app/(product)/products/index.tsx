import { useLocalSearchParams } from "expo-router";
import { Text, View, ScrollView } from "react-native";
import ProductCard from "@/components/src/molecules/ProductCard/ProductCard";
import AffiliateCard from "@/components/src/molecules/AffiliateCard/AffiliateCard";

const ProductListScreen = () => {
  const { productId, ref, refv1 } = useLocalSearchParams();

  return (
    <View style={{ $$css: true, _: "flex-1" }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        {/* Outer container with max-width */}
        <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto" }}>
          <View
            style={{
              $$css: true,
              _: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
            }}
          >
            <AffiliateCard />
            <AffiliateCard />
            <AffiliateCard />
            <AffiliateCard />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductListScreen;
