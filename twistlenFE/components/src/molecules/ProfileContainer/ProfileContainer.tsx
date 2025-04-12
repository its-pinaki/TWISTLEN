import { View, Text } from "react-native";
import React from "react";
import CustomImage from "../../atoms/CustomImage/CustomImage";
import Typography from "../../atoms/Typography/Typography";
import IconBlock from "../../atoms/IconBlock/IconBlock";

const ProfileContainer = () => {
  return (
    <View>
      <CustomImage source={"https://picsum.photos/200"} variant="right">
        <View style={{ padding: 5 }}>
          <Typography text="Uaer098aQd" fontWeight={"bold"} fontSize={18} />
          <View style={{ display: "flex", flexDirection: "row" }}>
            <IconBlock
              icon={{
                serviceType: "Ionicons",
                iconName: "wallet-outline",
                size: 12,
                color: "black",
                noBorder: true,
                label: "1000",
                marginHorizontal: 5,
                marginVertical: 5,
              }}
            />
            <IconBlock
              icon={{
                serviceType: "MaterialIcons",
                iconName: "leaderboard",
                size: 12,
                color: "black",
                noBorder: true,
                label: "10",
                marginHorizontal: 5,
                marginVertical: 5,
              }}
            />
            <IconBlock
              icon={{
                serviceType: "MaterialIcons",
                iconName: "work-outline",
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
      </CustomImage>
    </View>
  );
};

export default ProfileContainer;
