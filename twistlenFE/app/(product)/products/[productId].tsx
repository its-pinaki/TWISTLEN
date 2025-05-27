import { useLocalSearchParams } from "expo-router";
import { Text, View, ScrollView, SafeAreaView, Animated } from "react-native";
import ProductCard from "@/components/src/molecules/ProductCard/ProductCard";
import OfferSections from "@/components/src/molecules/OfferSections/OfferSections";
import ThreadedDiscussion from "@/components/src/molecules/DiscussionThreads/ThreadedDiscussion";
import { CommentType } from "@/components/src/molecules/DiscussionThreads/types";
import Header from "@/components/src/atoms/Header/Header";
import Footer from "@/components/src/atoms/Footer/Footer";
import ProductDetails from "@/components/src/organisms/ProductDetails/ProductDetails";

const ProductScreen = () => {
  const { productId, ref, refv1 } = useLocalSearchParams();

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
          marginTop: 30,
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

        <View style={{ transform: [{ scale: 1 }] }}>
          <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto" }}>
            <ProductDetails />
          </View>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
};

export default ProductScreen;
