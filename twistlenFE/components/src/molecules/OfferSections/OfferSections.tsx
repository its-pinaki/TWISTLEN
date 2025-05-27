import { View, Text, ImageBackground } from "react-native";
import React from "react";
import Typography from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import IconBlock from "../../atoms/IconBlock/IconBlock";

const OfferSections = () => {
  return (
    <View
      style={{
        $$css: true,
        _: "bg-white p-4 rounded-lg shadow-md border border-gray-200",
      }}
    >
      <View
        style={{
          $$css: true,
          _: "flex justify-between items-center flex-row mb-4",
        }}
      >
        <View>
          <Typography
            text={"Ends In : 23H: 35M: 12S"}
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "#111827",
            }}
          />
          <Typography
            text={"Legendary Packs"}
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#111827",
            }}
          />
          <Typography
            text={"Contains"}
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "#111827",
            }}
          />
        </View>
        <View>
          <Button
            title={"Buy $200"}
            textColor="#FFFFFF"
            buttonColor="#4F46E5"
            textStyle={{
              fontSize: 12,
              fontWeight: "bold",
            }}
          />
        </View>
      </View>

      <View
        style={{
          $$css: true,
          _: "flex flex-row mb-4",
        }}
      >
        <ImageBackground
          source={{ uri: "https://picsum.photos/300" }}
          style={{
            height: 80,
            width: 80,
            borderRadius: 8,
            backgroundColor: "#E0F7FA",
            marginRight: 10,
            overflow: "hidden",
            position: "relative",
          }}
          imageStyle={{
            width: 80,
            height: 80,
            borderRadius: 8,
            backgroundColor: "#F5F5F5",
          }}
        >
          <View
            style={{
              position: "absolute",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              bottom: 12,
              backgroundColor: "rgba(255,255,255,0.9)",
              marginLeft: 5,
            }}
          >
            <IconBlock
              icon={{
                serviceType: "MaterialCommunityIcons",
                iconName: "package-variant-closed",
                size: 14,
                color: "#10B981",
                noBorder: true,
                label: "$ 230",
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: "#374151",
                },
              }}
            />
          </View>
        </ImageBackground>
        <ImageBackground
          source={{ uri: "https://picsum.photos/300" }}
          style={{
            height: 80,
            width: 80,
            borderRadius: 8,
            backgroundColor: "#E0F7FA",
            marginRight: 10,
            overflow: "hidden",
            position: "relative",
          }}
          imageStyle={{
            width: 80,
            height: 80,
            borderRadius: 8,
            backgroundColor: "#F5F5F5",
          }}
        >
          <View
            style={{
              position: "absolute",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              bottom: 12,
              backgroundColor: "rgba(255,255,255,0.9)",
              marginLeft: 5,
            }}
          >
            <IconBlock
              icon={{
                serviceType: "MaterialCommunityIcons",
                iconName: "package-variant-closed",
                size: 14,
                color: "#10B981",
                noBorder: true,
                label: "$ 230",
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: "#374151",
                },
              }}
            />
          </View>
        </ImageBackground>
        <ImageBackground
          source={{ uri: "https://picsum.photos/300" }}
          style={{
            height: 80,
            width: 80,
            borderRadius: 8,
            backgroundColor: "#E0F7FA",
            marginRight: 10,
            overflow: "hidden",
            position: "relative",
          }}
          imageStyle={{
            width: 80,
            height: 80,
            borderRadius: 8,
            backgroundColor: "#F5F5F5",
          }}
        >
          <View
            style={{
              position: "absolute",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              bottom: 12,
              backgroundColor: "rgba(255,255,255,0.9)",
              marginLeft: 5,
            }}
          >
            <IconBlock
              icon={{
                serviceType: "MaterialCommunityIcons",
                iconName: "package-variant-closed",
                size: 14,
                color: "#10B981",
                noBorder: true,
                label: "$ 230",
                textStyle: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: "#374151",
                },
              }}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default OfferSections;
