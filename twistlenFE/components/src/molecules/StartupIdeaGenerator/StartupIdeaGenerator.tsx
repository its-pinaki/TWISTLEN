import { View, Text } from "react-native";
import React from "react";
import Typography from "../../atoms/Typography/Typography";
import CustomDropDown from "../../atoms/CustomDropDown/CustomDropDown";
import Button from "../../atoms/Button/Button";
import { Icon } from "react-native-paper";
import IconBlock from "../../atoms/IconBlock/IconBlock";

const StartupIdeaGenerator = () => {
  const industries = [{ id: "1", name: "Technology" }];
  return (
    <View style={{}}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          text={"Generate Your Next"}
          style={{
            fontSize: 32,
            fontWeight: "900",
            color: "#111827",
            margin: 0,
            alignSelf: "center",
          }}
        />
        <Typography
          text={" Startup Idea"}
          style={{
            fontSize: 32,
            fontWeight: "900",
            color: "#4F46E5",
            margin: 0,
            alignSelf: "center",
          }}
        />
      </View>

      <Typography
        text={
          "Choose your interests and preferences, and let StartGenie spark innovative startup ideas tailored for you."
        }
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#6B7280",
          marginVertical: 12,
          alignSelf: "center",
          textAlign: "center",
        }}
      />

      {/* Attributes */}
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 2,
          width: "100%",
          marginTop: 16,
        }}
      >
        <View
          style={{
            $$css: true,
            _: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2",
          }}
        >
          <CustomDropDown
            value={industries}
            uniqueKey="id"
            displayName="name"
            single={true}
            texttype="Industries"
            searchPlaceholder="Search industries..."
            isError={false}
            bordercolor={"#E5E7EB"}
          />
          <CustomDropDown
            value={industries}
            uniqueKey="id"
            displayName="name"
            single={true}
            texttype="Industries"
            searchPlaceholder="Search industries..."
            isError={false}
            bordercolor={"#E5E7EB"}
          />
        </View>
        <Button
          customContent={
            <IconBlock
              icon={{
                serviceType: "FontAwesome6",
                iconName: "wand-magic-sparkles",
                size: 18,
                color: "#FFFFFF",
                noBorder: true,
                labelComponent: (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#FFFFFF",
                      marginLeft: 5,
                    }}
                  >
                    Generate Ideas
                  </Text>
                ),
                style: {
                  backgroundColor: "#4F46E5",
                  padding: 2,
                  fontSize: 18,
                  fontWeight: "400",
                  color: "#FFFFFF",
                },
              }}
            />
          }
          textColor="white"
          buttonColor="#4F46E5"
          verticalPadding={5}
          horizontalPadding={8}
          borderRadius={12}
          textStyle={{
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Inter",
          }}
          style={{ alignSelf: "flex-end", marginTop: 8 }}
        />
      </View>

      {/* filter section */}
      <View
        style={{
          $$css: true,
          _: "flex-row justify-between items-center mt-6",
        }}
      >
        <View style={{ $$css: true, _: "flex-1" }}>
          <Typography
            text={"Startup Ideas"}
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#111827",
              margin: 0,
              alignSelf: "flex-start",
            }}
          />
        </View>

        <View style={{ $$css: true, _: "flex-row items-center flex-shrink-0" }}>
          <Typography
            text={"Sort By: "}
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "#6B7280",
              marginRight: 4,
              alignSelf: "center",
            }}
          />

          <View style={{ $$css: true, _: "min-w-[120px]" }}>
            <CustomDropDown
              value={industries}
              uniqueKey="id"
              displayName="name"
              single={true}
              texttype="Most Recent"
              searchPlaceholder="Search industries..."
              isError={false}
              bordercolor={"#E5E7EB"}
            />
          </View>
        </View>
      </View>

      {/* Idea Cards */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: 16,
          marginTop: 16,
        }}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
            borderWidth: 1,
            borderRadius: 12,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 2,
            width: "100%",
            maxWidth: 400,
            marginBottom: 16,
          }}
        >
          <Button
            title={"Healthcare"}
            textColor="#4F46E5"
            buttonColor="#E5E7EB"
            verticalPadding={2}
            horizontalPadding={10}
            borderRadius={50}
            textStyle={{
              fontSize: 12,
              fontWeight: "normal",
              fontFamily: "Inter",
            }}
            style={{ alignSelf: "flex-start", marginBottom: 5 }}
          />
          <Typography
            text={"Startup Idea"}
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#111827",
              margin: 0,
            }}
          />
          <Typography
            text={
              "A platform that connects local farmers with consumers, allowing them to buy fresh produce directly from the source."
            }
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "#6B7280",
              marginTop: 4,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <IconBlock
                icon={{
                  serviceType: "Feather",
                  iconName: "bookmark",
                  size: 18,
                  color: "#000000",
                  noBorder: true,
                  style: { marginRight: 8 },
                }}
              />
              <IconBlock
                icon={{
                  serviceType: "EvilIcons",
                  iconName: "share-google",
                  size: 18,
                  color: "#000000",
                  noBorder: true,
                }}
              />
            </View>
            <IconBlock
              icon={{
                serviceType: "MaterialCommunityIcons",
                iconName: "dots-horizontal",
                size: 18,
                color: "#000000",
                noBorder: true,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default StartupIdeaGenerator;
