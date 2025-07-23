import { View, Text, ScrollView } from "react-native";
import React from "react";
import AutoRotatingCardGroup from "../../molecules/AutoRotatingCardGroup/AutoRotatingCardGroup";
import QueryCard from "../../molecules/QueryCard/QueryCard";
import ProductDealCard from "../../molecules/ProductDealCard/ProductDealCard";
import GenericTable from "../../atoms/GenericTable/GenericTable";
import ThreadedDiscussion from "../../molecules/DiscussionThreads/ThreadedDiscussion";

const QueryDetails = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto" }}>
        <View>
          <Text>QueryDetails</Text>
          <QueryCard
            title="Budget laptop for editing under ₹40k"
            meta={{ user: "User", timeAgo: "2 hrs ago", views: 321 }}
            tags={[
              { label: "Purpose", value: "Video Editing", icon: "✏️" },
              { label: "Budget", value: "₹40,000", icon: "💸", color: "green" },
              { label: "Priority", value: "SSD, Lightweight", icon: "⭐" },
            ]}
            onEdit={() => console.log("Edit clicked")}
            onFollow={() => console.log("Follow clicked")}
          />
          <ProductDealCard
            productName="Lenovo Slim 3"
            price="₹39,999"
            features={[
              { icon: "⚡", label: "Long battery" },
              { icon: "💽", label: "SSD 512GB" },
              { icon: "👍", label: "Good reviews" },
            ]}
            score="89/100"
            onViewDeal={() => console.log("View Deal clicked")}
            onWhyPicked={() => console.log("Why we picked clicked")}
          />
          <View
            style={{
              $$css: true,
              _: "p-3 bg-white m-3 rounded-xl border border-gray-200",
            }}
          >
            <GenericTable
              columns={[
                {
                  key: "feature",
                  title: "Feature",
                },
                {
                  key: "samsung",
                  title: "Samsung Galaxy S21 FE",
                },
                {
                  key: "oneplus",
                  title: "OnePlus 9",
                },
                {
                  key: "iphone",
                  title: "iPhone 13",
                },
              ]}
              data={[
                {
                  feature: "Price",
                  samsung: "₹42,999",
                  oneplus: "₹39,999",
                  iphone: "₹69,900",
                },
                {
                  feature: "Camera",
                  samsung: "12MP + 12MP + 8MP",
                  oneplus: "48MP + 50MP + 2MP",
                  iphone: "12MP + 12MP",
                },
                {
                  feature: "Battery",
                  samsung: "4500 mAh",
                  oneplus: "4500 mAh",
                  iphone: "3240 mAh",
                },
                {
                  feature: "Usage Fit",
                  samsung: "★★★☆☆",
                  oneplus: "★★★★☆",
                  iphone: "★★★★☆",
                },
                {
                  feature: "Customer Reviews",
                  samsung: '"Great camera quality"',
                  oneplus: '"Fast charging, smooth performance"',
                  iphone: '"Premium build, excellent ecosystem"',
                },
                {
                  feature: "Action",
                  samsung: (
                    <Text
                      style={{
                        $$css: true,
                        _: "bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all duration-200 text-center",
                      }}
                    >
                      Buy Now
                    </Text>
                  ),
                  oneplus: (
                    <Text
                      style={{
                        $$css: true,
                        _: "bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all duration-200 text-center",
                      }}
                    >
                      Buy Now
                    </Text>
                  ),
                  iphone: (
                    <Text
                      style={{
                        $$css: true,
                        _: "bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all duration-200 text-center",
                      }}
                    >
                      Buy Now
                    </Text>
                  ),
                },
              ]}
              rowsPerPage={3}
              themeColor="#2563EB"
              hidePagination
              hideSearch
            />
          </View>
          <View
            style={{
              $$css: true,
              _: "p-3 bg-white m-3 rounded-xl border border-gray-200",
            }}
          >
            <ThreadedDiscussion />
          </View>

          <AutoRotatingCardGroup
            title="More Like This"
            items={[
              "Budget laptops with 8GB RAM",
              "Laptops for students under ₹45k",
              "Editors' Picks: July 2025",
              "Best gaming laptops 2025",
              "Ultrabooks for travel",
              "Top-rated Chromebooks",
            ]}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default QueryDetails;
