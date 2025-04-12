import { View } from "react-native";
import React from "react";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";

const ActionInput = () => {
  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "lightgrey",
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 5,
          width: "100%",
        }}
      >
        <View style={{ flex: 1 }}>
          <Input
            value={""}
            placeholder={"Enter your query here"}
            onChangeText={() => {}}
            inputStyle={{ height: 40 }}
            mode={"flat"}
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Button
            horizontalPadding={15}
            verticalPadding={8}
            title={"Search"}
            onPress={() => {}}
            buttonColor="black"
          />
        </View>
      </View>
    </View>
  );
};

export default ActionInput;
