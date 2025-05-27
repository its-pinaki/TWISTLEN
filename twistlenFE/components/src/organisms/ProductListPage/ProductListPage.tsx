import { View, Text } from "react-native";
import React, { useState } from "react";
import ProductContainer from "../../molecules/ProductContainer/ProductContainer";
import ActionInput from "../../molecules/ActionInput/ActionInput";
import ScrollableChips from "../../molecules/ScrollableChips/ScrollableChips";
import Button from "../../atoms/Button/Button";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import OfferSections from "../../molecules/OfferSections/OfferSections";
import AffiliateCard from "../../molecules/AffiliateCard/AffiliateCard";

const ProductListPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "1", label: "All", value: "all" },
    { id: "2", label: "Popular", value: "popular" },
    { id: "3", label: "Newest", value: "newest" },
    { id: "4", label: "Price Low", value: "price_low" },
    { id: "5", label: "Price High", value: "price_high" },
  ];
  return (
    <View>
      <View
        style={{
          $$css: true,
          _: "mb-2",
        }}
      >
        <ActionInput />
      </View>
      <View
        style={{
          $$css: true,
          _: "mb-2 w-full",
        }}
      >
        <ScrollableChips
          chips={filters}
          selectedValue={selectedFilter}
          onSelect={setSelectedFilter}
          chipStyle={{ backgroundColor: "#e0e0e0" }}
          activeChipStyle={{ backgroundColor: "#4CAF50" }}
          textStyle={{ fontSize: 16 }}
          activeTextStyle={{ fontWeight: "bold" }}
        />
      </View>

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
  );
};

export default ProductListPage;
