// components/auth/LoginForm.tsx

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { loginUser } from "../../services/login.services";
import { router } from "expo-router";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import Typography from "../../atoms/Typography/Typography";
import Toast from "../../atoms/Toast/Toast";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { isValidUserId } from "../../utils/shared.utils";

type LoginFormProps = {
  loginLabel?: string;
  userIdPlaceHolder?: string;
  userIdHelperText?: string;
  userIdLabel?: string;
  userIdErrorText?: string;
  passwordPlaceHolder?: string;
  passwordLabel?: string;
  passwordInfoText?: string;
  passwordErrorText?: string;
  headerrrorText?: string;
  loginCtaLabel?: string;
  signupCtaLabel?: string;
  forgotPasswordCtaLabel?: string;
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { height, width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    userId: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    userId: "",
    password: "",
  });
  const [showToast, setShowToast] = useState({
    status: false,
    type: "success",
    header: "",
    subtext: "",
  });
  const validateField = () => {
    let errors = { userId: "", password: "" };
    let valid = true;

    if (!formDetails?.userId) {
      errors.userId = props?.userIdErrorText || "UserId Field Can't Be Empty";
      valid = false;
    }
    if (isValidUserId(formDetails?.userId)) {
      errors.userId = "Please Enter A Valid UserId";
      valid = false;
    }
    if (!formDetails?.password) {
      errors.password =
        props?.passwordErrorText || "Password Field Can't Be Empty";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };
  const loginHandler = async () => {
    if (!validateField()) return;
    setIsLoading(true);
    const result = await loginUser(
      formDetails?.userId,
      formDetails?.password,
      "Merchant"
    );
    console.log("result", result);

    if (result.success !== false) {
      setIsLoading(false);
      router.replace("/(preregistration)");
    } else {
      setIsLoading(false);
      setShowToast({
        status: true,
        type: "error",
        header: "Login Failed",
        subtext: result.message || "Please try again.",
      });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: width * 0.05, // 5% padding on sides
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconBlock
              icon={{
                serviceType: "AntDesign",
                iconName: "login",
                size: 24,
                color: "black",
              }}
            />
            <Typography
              text={props?.loginLabel}
              fontWeight={"bold"}
              fontSize={14}
            />
          </View>
          {showToast?.status && (
            <Toast
              type={showToast?.type}
              header={showToast?.header}
              subtext={showToast?.subtext}
              duration={3000}
              onClose={() =>
                setShowToast({
                  status: false,
                  type: "success",
                  header: "",
                  subtext: "",
                })
              }
            />
          )}

          {/* User ID Input */}
          <Input
            value={formDetails.userId}
            onChangeText={(text) =>
              setFormDetails({ ...formDetails, userId: text })
            }
            placeholder={props?.userIdPlaceHolder}
            mode="outlined"
            label={props?.userIdLabel}
            error={!!formErrors.userId}
            helperText={formErrors.userId || props?.userIdHelperText}
            helperTextColor={formErrors.userId ? "red" : "black"}
          />

          {/* Password Input */}
          <Input
            value={formDetails.password}
            onChangeText={(text) =>
              setFormDetails({ ...formDetails, password: text })
            }
            placeholder={props?.passwordPlaceHolder}
            mode="outlined"
            label="Password"
            isPasswordField
            error={!!formErrors.password}
            helperText={formErrors.password || props?.passwordInfoText}
            helperTextColor={formErrors.password ? "red" : "black"}
          />
          <View style={{ alignItems: "flex-end" }}>
            <Typography
              text={"Forgot Password"}
              fontWeight={"bold"}
              fontSize={12}
              onPress={() => {
                router.push("/(auth)/forgotpassword");
              }}
            />
          </View>

          {/* Login Button */}
          <Button
            title={props?.loginCtaLabel}
            buttonColor={"#2e86de"}
            onPress={loginHandler}
            horizontalPadding={width * 0.02}
            verticalPadding={height * 0.015}
            style={{ width: "100%" }}
            loading={isLoading}
            disabled={isLoading}
          />

          {/* Toggle Between Login & Signup */}
          <Typography
            text={props?.signupCtaLabel}
            fontWeight={"bold"}
            fontSize={12}
            onPress={() => {
              router.push("/(auth)/signup");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginForm;
