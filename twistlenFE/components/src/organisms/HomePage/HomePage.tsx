import { View, Text, Image } from "react-native";
import React from "react";
import Button from "../../atoms/Button/Button";
import { Link } from "expo-router";
import CustomImage from "../../atoms/CustomImage/CustomImage";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import Typography from "../../atoms/Typography/Typography";
import GenericTable from "../../atoms/GenericTable/GenericTable";
import { truncateText } from "../../utils/shared.utils";

const HomePage = () => {
  const productData = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      image: "https://via.placeholder.com/50",
      price: "$99",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Smartwatch",
      category: "Wearables",
      image: "https://via.placeholder.com/50",
      price: "$149",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Gaming Laptop",
      category: "Computers",
      image: "https://via.placeholder.com/50",
      price: "$1299",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      category: "Audio",
      image: "https://via.placeholder.com/50",
      price: "$49",
      rating: 4.1,
    },
  ];

  const columns = [
    { key: "image", title: "Image" },
    { key: "name", title: "Product", sortable: true },
    { key: "category", title: "Category" },
    { key: "price", title: "Price", sortable: true },
    { key: "rating", title: "Rating", sortable: true },
  ];

  return (
    <View>
      {/* Banner Section */}
      <Text>HomePage</Text>
      <CustomImage
        source={{ uri: "https://picsum.photos/200" }}
        shape="rectangle"
        width={150}
        height={100}
        borderColor="blue"
        overlayComponent={
          <View
            style={{
              padding: 5,
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
            }}
          >
            <Text style={{ color: "white", fontSize: 10 }}>New Arrival</Text>
          </View>
        }
      />
      <Link href="/(productmanager)">Add Products To Your Store</Link>
      <Link href="/(fulfillmenttracker)">Track Your Orders</Link>

      {/* Short DashBoards */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 10,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            borderRightColor: "rgba(0, 0, 0, 0.1)",
            borderRightWidth: 1,
            paddingHorizontal: 20,
          }}
        >
          <IconBlock
            icon={{
              serviceType: "MaterialCommunityIcons",
              iconName: "cash-multiple",
              size: 18,
              color: "black",
              noBorder: true,
              label: "Total Earnings",
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          />
          <Typography text="10,000" style={{ marginLeft: 30 }} />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <IconBlock
            icon={{
              serviceType: "MaterialCommunityIcons",
              iconName: "search-web",
              size: 18,
              color: "black",
              noBorder: true,
              label: "Traffic",
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          />
          <Typography text="1k" style={{ marginLeft: 30 }} />
        </View>
      </View>

      {/* Community Quotes */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography text="Recent Quotes" fontWeight="bold" />
        <Link href="/(community)">View All</Link>
      </View>

      <View
        style={{
          padding: 10,
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderTopWidth: 1,
          borderBottomWidth: 1,
        }}
      >
        <Typography
          text={truncateText("I wants pair of shoes under 500 rupees", 10)}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Typography
            text="By Pinaki"
            color="rgba(0,0,0,0.7)"
            fontWeight="bold"
          />
          <Typography
            text="3 days ago"
            color="rgba(0,0,0,0.3)"
            fontWeight="normal"
            fontSize={12}
            style={{ marginHorizontal: 5 }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconBlock
            icon={{
              serviceType: "MaterialCommunityIcons",
              iconName: "comment-multiple-outline",
              size: 12,
              color: "black",
              noBorder: true,
              label: "25",
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "like1",
              size: 12,
              color: "black",
              noBorder: true,
              label: "100",
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "like2",
              size: 12,
              color: "black",
              noBorder: true,
              label: "10",
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          />
        </View>
      </View>

      {/* Trending Products */}
      <GenericTable
        columns={columns}
        data={productData}
        heading="Trending Products"
        renderCell={(col, item) => {
          if (col.key === "image") {
            return (
              <Image
                source={{ uri: item.image }}
                style={{ width: 50, height: 50 }}
              />
            );
          }
          if (col.key === "rating") {
            return (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="star" size={16} color="gold" />
                <Text style={{ marginLeft: 5 }}>{item.rating}</Text>
              </View>
            );
          }
          return <Text>{item[col.key]}</Text>;
        }}
        rowsPerPage={3}
        hidePagination={true}
        hideSearch={true}
        themeColor="#ff5722"
      />
    </View>
  );
};

export default HomePage;
