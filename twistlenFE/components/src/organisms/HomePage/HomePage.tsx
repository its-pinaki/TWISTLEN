import { View, Text } from "react-native";
import React from "react";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import Typography from "../../atoms/Typography/Typography";
import CustomImage from "../../atoms/CustomImage/CustomImage";
import Button from "../../atoms/Button/Button";

const HomePage = () => {
  return (
    <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto px-4" }}>
      {/* stories from seller */}
      <View
        style={{
          $$css: true,
          _: "flex justify-between flex-row mx-4",
        }}
      >
        <IconBlock
          icon={{
            serviceType: "AntDesign",
            iconName: "star",
            size: 18,
            color: "#FBBF24",
            label: "Stories from Seller",
            noBorder: true,
            textStyle: {
              fontSize: 16,
              fontWeight: "normal",
              fontFamily: "Inter",
            },
          }}
        />
        <Typography
          text={"View All"}
          fontSize={14}
          fontWeight={"bold"}
          style={{ fontFamily: "Inter" }}
        />
      </View>
      <View
        style={{
          $$css: true,
          _: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2",
        }}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
            borderWidth: 0.1,
            borderRadius: 12,
            padding: 20,
          }}
        >
          <View
            style={{
              $$css: true,
              _: "flex flex-row items-center my-2",
            }}
          >
            <CustomImage
              source={{ uri: "https://picsum.photos/300/200" }}
              width={30}
              height={30}
              shape="circle"
            />
            <Typography
              text={"Riya's Loom"}
              fontSize={14}
              fontWeight={"bold"}
              style={{ fontFamily: "Inter", marginLeft: 10 }}
            />
          </View>
          <Typography
            text={
              "“This scarf was made by my grandmother during winter evenings.”"
            }
            fontSize={14}
            fontWeight={"normal"}
            style={{ fontFamily: "Inter", marginLeft: 10, marginVertical: 4 }}
          />
          <View style={{ alignSelf: "flex-start", marginVertical: 4 }}>
            <Button
              title="#handmade"
              buttonColor="#E5E7EB"
              borderRadius={50}
              borderColor="#3730A3"
              textColor="#3730A3"
              verticalPadding={2}
              horizontalPadding={10}
              textStyle={{
                fontWeight: "normal",
                fontSize: 12,
              }}
            />
          </View>

          <View
            style={{
              $$css: true,
              _: "flex flex-row justify-between my-2",
            }}
          >
            <IconBlock
              icon={{
                serviceType: "EvilIcons",
                iconName: "like",
                size: 18,
                color: "#6B7280",
                label: "24 Likes",
                noBorder: true,
                textStyle: {
                  fontSize: 16,
                  fontWeight: "normal",
                  fontFamily: "Inter",
                },
              }}
            />
            <IconBlock
              icon={{
                serviceType: "EvilIcons",
                iconName: "comment",
                size: 18,
                color: "#6B7280",
                label: "Comments",
                noBorder: true,
                textStyle: {
                  fontSize: 16,
                  fontWeight: "normal",
                  fontFamily: "Inter",
                },
              }}
            />
          </View>
        </View>
      </View>

      {/* micro trending */}
      <View
        style={{
          $$css: true,
          _: "flex justify-between flex-row mx-4 mt-2",
        }}
      >
        <IconBlock
          icon={{
            serviceType: "AntDesign",
            iconName: "star",
            size: 18,
            color: "#FBBF24",
            label: "Micro Trending",
            noBorder: true,
            textStyle: {
              fontSize: 16,
              fontWeight: "normal",
              fontFamily: "Inter",
            },
          }}
        />
        <Typography
          text={"View All"}
          fontSize={14}
          fontWeight={"bold"}
          style={{ fontFamily: "Inter" }}
        />
      </View>
      <View
        style={{
          $$css: true,
          _: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5",
        }}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
            borderWidth: 0.1,
            borderRadius: 12,
            padding: 20,
            flexWrap: "wrap",
          }}
        >
          <View
            style={{
              $$css: true,
              _: "flex flex-row items-center my-2",
            }}
          >
            <CustomImage
              source={{ uri: "https://picsum.photos/300/200" }}
              width={30}
              height={30}
              shape="circle"
            />

            <Typography
              text={
                "“This scarf was made by my grandmother during winter evenings.”"
              }
              fontSize={14}
              fontWeight={"normal"}
              style={{ fontFamily: "Inter", marginLeft: 10 }}
            />
          </View>

          <View style={{ alignSelf: "flex-start", marginVertical: 4 }}>
            <Button
              title="#handmade"
              buttonColor="#E5E7EB"
              borderRadius={50}
              borderColor="#3730A3"
              textColor="#3730A3"
              verticalPadding={2}
              horizontalPadding={10}
              textStyle={{
                fontWeight: "normal",
                fontSize: 12,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
