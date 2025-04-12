import { View, Text, Dimensions } from "react-native";
import React from "react";
import Typography from "../../atoms/Typography/Typography";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import Button from "../../atoms/Button/Button";
import CustomImage from "../../atoms/CustomImage/CustomImage";
import { truncateText } from "../../utils/shared.utils";

const ProductContainer = () => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        padding: 8,
        borderRadius: 8,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      }}
    >
      <View style={{ borderRadius: 8, backgroundColor: "white" }}>
        <CustomImage
          source={{ uri: "https://picsum.photos/300/200" }}
          width={"100%"}
          height={180}
          shape="rectangle"
        >
          <View>
            <Typography
              text="Ghost Town Series"
              fontWeight={"bold"}
              fontSize={18}
            />
            <Typography
              text="This is series from book.."
              fontWeight={"normal"}
              fontSize={12}
            />
          </View>
        </CustomImage>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          marginVertical: 8,
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <Typography
            text="0.2"
            color={"#2ecc71"}
            fontWeight={"normal"}
            fontSize={12}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          />
          <Typography
            text="Per View"
            fontWeight={"bold"}
            fontSize={12}
            style={{ marginHorizontal: 5 }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Typography
            text="10%"
            color={"#2ecc71"}
            fontWeight={"normal"}
            fontSize={12}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          />
          <Typography
            text="Per Sale"
            fontWeight={"bold"}
            fontSize={12}
            style={{ marginHorizontal: 5 }}
          />
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "like2",
              size: 10,
              color: "black",
              noBorder: true,
              label: "21",
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "dislike2",
              size: 10,
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
              iconName: "sell",
              size: 10,
              color: "black",
              noBorder: true,
              label: "1000",
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          />
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          title={"Create & Share"}
          onPress={() => {}}
          buttonColor="black"
          horizontalPadding={5}
          verticalPadding={5}
          borderRadius={5}
          style={{ paddingVertial: 0 }}
          textStyle={{ fontSize: 10 }}
        />
        <Button
          title={"View Details"}
          onPress={() => {}}
          buttonColor="black"
          horizontalPadding={5}
          verticalPadding={5}
          borderRadius={5}
          style={{ paddingVertial: 0 }}
          textStyle={{ fontSize: 10 }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Button
          title={truncateText(
            "https://www.google.com/search?q=ind+vs+nz&rlz=1C1CHBF_enIN1043IN1043&oq=ind+vs+nz&gs_lcrp=EgZjaHJvbWUyDggAEEUYJxg5GIAEGIoFMgwIARAjGCcYgAQYigUyCggCEAAYsQMYgAQyCggDEAAYsQMYgAQyEAgEEAAYgwEYsQMYgAQYigUyEggFEAAYChiDARixAxiABBiKBTIHCAYQABiABDIKCAcQABixAxiABDIHCAgQABiABDIQCAkQABiDARixAxiABBiKBdIBCDI5NzVqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8",
            30
          )}
          onPress={() => {}}
          buttonColor="black"
          horizontalPadding={5}
          verticalPadding={5}
          borderRadius={5}
          style={{
            paddingVertial: 0,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
          textStyle={{ fontSize: 10, color: "black" }}
          disabled={true}
          borderColor="black"
        />
        <IconBlock
          icon={{
            serviceType: "Feather",
            iconName: "copy",
            size: 15,
            color: "black",
            width: 40,
            height: 30,
          }}
        />
      </View>
    </View>
  );
};

export default ProductContainer;
