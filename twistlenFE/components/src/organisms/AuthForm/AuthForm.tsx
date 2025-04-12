import { View, Text } from "react-native";
import React, { useState } from "react";
import Input from "../../atoms/Input/Input";
import CustomImage from "../../atoms/CustomImage/CustomImage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Button from "../../atoms/Button/Button";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import { isRunningInNextron } from "../../utils/shared.utils";

const AuthForm = ({
  userIdPlaceHolder,
  PasswordPlaceHolder,
  loginCtaLabel,
  loginIconLabel,
  signupHeader,
  signupSubTextRte,
  loginHeader,
  loginSubTextRte,
  changepwrdHeader,
  chngpwrdSubTextRte,
  forgotpwrdHeader,
  forgotpwrdSubTextRte,
}) => {
  const [isGetLoading,setIsGetLoading]=useState(false);
  const [isUpdateLoading,setIsUpdateLoading]=useState(false);
  const [formDetails, setFormDetails] = useState({
    userId: "",
    Password: "",
    confirmPassword:"",
    Otp:","
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconBlock
        icon={{
          serviceType: "MaterialIcons",
          iconName: "login",
          size: 24,
          color: "black",
        }}
      />
      <View>
        <Input
          value={formDetails.userId}
          onChangeText={(text) => {setFormDetails({...formDetails,userId:text})}}
          placeholder={userIdPlaceHolder}
        />
        <Input
          value={formDetails.Password}
          onChangeText={(text) => {setFormDetails({...formDetails,Password:text})}}
          placeholder={PasswordPlaceHolder}
        />
        <Button title={loginCtaLabel} onPress={() => {}} />
      </View>
    </View>
  );
};

export default AuthForm;
