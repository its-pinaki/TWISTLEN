import { View, Text } from "react-native";
import React from "react";
import StartupIdeaGenerator from "../../molecules/StartupIdeaGenerator/StartupIdeaGenerator";
import AssetTool from "../../molecules/AssetTool/AssetTool";
import Button from "../../atoms/Button/Button";
import { router } from "expo-router";

const ToolManager = ({ tool }) => {
  return (
    <View>
      <Text>ToolManager</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Button
          title={"StartupIdeaGenerator"}
          textColor="white"
          buttonColor="#EF4444"
          verticalPadding={2}
          horizontalPadding={10}
          borderRadius={50}
          textStyle={{
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Inter",
          }}
          onPress={() => {
            router.replace("/(tools)?tool=StartupIdeaGenerator");
          }}
        />
        <Button
          title={"FakeFortune"}
          textColor="white"
          buttonColor="#EF4444"
          verticalPadding={2}
          horizontalPadding={10}
          borderRadius={50}
          textStyle={{
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Inter",
          }}
          onPress={() => {
            router.replace("/(tools)?tool=FakeFortune");
          }}
        />
      </View>

      {tool === "StartupIdeaGenerator" && <StartupIdeaGenerator />}
      {tool === "FakeFortune" && <AssetTool />}
    </View>
  );
};

export default ToolManager;
