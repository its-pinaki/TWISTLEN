import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import Toast from "../../atoms/Toast/Toast";
import { router } from "expo-router";
import React, { useState } from "react";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import ToggleButton from "../../atoms/ToggleButton/ToggleButton";
import Typography from "../../atoms/Typography/Typography";
import axios from "axios";
import { loginUser } from "./AuthForm.Services";
import IconBlock from "../../atoms/IconBlock/IconBlock";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const AuthForm = ({
  userIdPlaceHolder,
  PasswordPlaceHolder,
  loginCtaLabel,
}) => {
  const token = router.query?.token || ""; // Get token from the URL
  console.log("token", token);
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState("login"); //signup/login/forgotpassword/changepassword/setpassword
  const [selectedUserType, setSelectedUserType] = useState("Merchant");
  const [formDetails, setFormDetails] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    token: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    email: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    token: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    email: "",
    phoneNumber: "",
  });

  const handleToggle = (selected) => {
    setSelectedUserType(selected);
  };

  const validateField = () => {
    let errors = { userId: "", password: "", confirmPassword: "" };
    let valid = true;

    if (!formDetails?.userId) {
      errors.userId = "User ID Field Can't Be Empty";
      valid = false;
    }
    if (!formDetails?.password) {
      errors.password = "Password Field Can't Be Empty";
      valid = false;
    }
    if (authState === "signup" && !formDetails?.confirmPassword) {
      errors.confirmPassword = "Confirm Password Can't Be Empty";
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
      selectedUserType
    );

    if (result.success !== false) {
      setIsLoading(false);
      router.replace("/(preregistration)");
    } else {
      setIsLoading(false);
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
        {authState === "forgotpassword" ? (
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <View style={{ alignItems: "center" }}>
              <Typography
                text={"Forgot Password"}
                fontWeight={"bold"}
                fontSize={16}
                textAlign="center"
              />
              <Typography
                text={
                  "A link to change your password will be sent to your registered email address."
                }
                fontWeight={"normal"}
                fontSize={14}
                textAlign="center"
                style={{ marginVertical: 10 }}
              />
              <Button
                title={"Set Password"}
                buttonColor={"#2e86de"}
                onPress={() => {
                  setAuthState("setpassword");
                }}
                horizontalPadding={width * 0.02}
                verticalPadding={height * 0.015}
                style={{ width: "100%" }}
              />
            </View>
          </View>
        ) : authState === "changepassword" ? (
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <IconBlock
              icon={{
                serviceType: "MaterialIcons",
                iconName: "password",
                size: 24,
                color: "black",
              }}
            />
            <Typography
              text={"Change Your Password"}
              fontWeight={"bold"}
              fontSize={14}
            />
            {/* Old Password Input */}
            <Input
              value={formDetails.oldPassword}
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, oldPassword: text })
              }
              placeholder={userIdPlaceHolder}
              mode="outlined"
              label="User ID"
              error={!!formErrors.oldPassword}
              helperText={formErrors.oldPassword || "Enter Old Password"}
              helperTextColor={formErrors.oldPassword ? "red" : "black"}
            />
            {/* New Password Input */}
            <Input
              value={formDetails.newPassword}
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, newPassword: text })
              }
              placeholder={userIdPlaceHolder}
              mode="outlined"
              label="User ID"
              error={!!formErrors.newPassword}
              helperText={formErrors.newPassword || "Enter New Password"}
              helperTextColor={formErrors.newPassword ? "red" : "black"}
            />
            {/* New Confirm Password Input */}
            <Input
              value={formDetails.confirmNewPassword}
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, confirmNewPassword: text })
              }
              placeholder={userIdPlaceHolder}
              mode="outlined"
              label="User ID"
              error={!!formErrors.confirmNewPassword}
              helperText={
                formErrors.confirmNewPassword || "Confirm New Password"
              }
              helperTextColor={formErrors.confirmNewPassword ? "red" : "black"}
            />
            <Button
              title={"Change Password"}
              buttonColor={"#2e86de"}
              onPress={() => {
                // setAuthState("setpassword");
              }}
              horizontalPadding={width * 0.02}
              verticalPadding={height * 0.015}
              style={{ width: "100%" }}
            />
          </View>
        ) : authState === "setpassword" ? (     
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <IconBlock
              icon={{
                serviceType: "MaterialCommunityIcons",
                iconName: "form-textbox-password",
                size: 24,
                color: "black",
              }}
            />
            <Typography
              text={"Set Your Password"}
              fontWeight={"bold"}
              fontSize={14}
            />
            {/* Token Input */}
            <Input
              value={formDetails.token}
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, token: text })
              }
              placeholder={userIdPlaceHolder}
              mode="outlined"
              label="User ID"
              error={!!formErrors.token}
              helperText={formErrors.token || "Enter Your Token"}
              helperTextColor={formErrors.token ? "red" : "black"}
            />
            {/* New Password Input */}
            <Input
              value={formDetails.newPassword}
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, newPassword: text })
              }
              placeholder={userIdPlaceHolder}
              mode="outlined"
              label="User ID"
              error={!!formErrors.newPassword}
              helperText={formErrors.newPassword || "Enter New Password"}
              helperTextColor={formErrors.newPassword ? "red" : "black"}
            />
            {/* New Confirm Password Input */}
            <Input
              value={formDetails.confirmNewPassword}
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, confirmNewPassword: text })
              }
              placeholder={userIdPlaceHolder}
              mode="outlined"
              label="User ID"
              error={!!formErrors.confirmNewPassword}
              helperText={
                formErrors.confirmNewPassword || "Confirm New Password"
              }
              helperTextColor={formErrors.confirmNewPassword ? "red" : "black"}
            />
            <Button
              title={"Set Password"}
              buttonColor={"#2e86de"}
              onPress={() => {
                // setAuthState("changePassword");
              }}
              horizontalPadding={width * 0.02}
              verticalPadding={height * 0.015}
              style={{ width: "100%" }}
            />
          </View>
        ) : (
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
                  iconName: authState === "signup" ? "user" : "login",
                  size: 24,
                  color: "black",
                }}
              />
              <Typography
                text={authState === "signup" ? "SignUp as" : "Login as"}
                fontWeight={"bold"}
                fontSize={14}
              />
            </View>

            <ToggleButton
              options={["Merchant", "Partner", "Shopper"]}
              onToggle={handleToggle}
              textStyle={{ fontSize: width >= 480 ? 12 : 8 }}
            />
            <Typography
              text={
                selectedUserType === "Merchant"
                  ? "List and sell your products."
                  : selectedUserType === "Partner"
                  ? "Promote products and earn commissions."
                  : "Discover and buy products effortlessly."
              }
              fontWeight={"normal"}
              fontSize={12}
              textAlign="center"
            />

            {/* User ID Input */}
            <Input
              value={formDetails.userId}
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, userId: text })
              }
              placeholder={userIdPlaceHolder}
              mode="outlined"
              label="User ID"
              error={!!formErrors.userId}
              helperText={formErrors.userId || "Enter your registered user ID"}
              helperTextColor={formErrors.userId ? "red" : "black"}
            />
            {/* User ID Input */}
            {authState === "signup" && (
              <Input
                value={formDetails.email}
                onChangeText={(text) =>
                  setFormDetails({ ...formDetails, email: text })
                }
                placeholder={userIdPlaceHolder}
                mode="outlined"
                label="User ID"
                error={!!formErrors.email}
                helperText={
                  formErrors.email || "Enter your valid email address"
                }
                helperTextColor={formErrors.email ? "red" : "black"}
              />
            )}
            {/* User ID Input */}
            {authState === "signup" && (
              <Input
                value={formDetails.phoneNumber}
                onChangeText={(text) =>
                  setFormDetails({ ...formDetails, phoneNumber: text })
                }
                placeholder={userIdPlaceHolder}
                mode="outlined"
                label="User ID"
                error={!!formErrors.phoneNumber}
                helperText={
                  formErrors.phoneNumber || "Enter your 10 digit phone number"
                }
                helperTextColor={formErrors.phoneNumber ? "red" : "black"}
              />
            )}

            {/* Password Input */}
            <Input
              value={formDetails.password}
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, password: text })
              }
              placeholder={PasswordPlaceHolder}
              mode="outlined"
              label="Password"
              isPasswordField
              error={!!formErrors.password}
              helperText={
                formErrors.password ||
                "Use 8+ characters with a mix of letters, numbers & symbols."
              }
              helperTextColor={formErrors.password ? "red" : "black"}
            />

            {/* Confirm Password Input (Only for Signup) */}
            {authState === "signup" && (
              <Input
                value={formDetails.confirmPassword}
                onChangeText={(text) =>
                  setFormDetails({ ...formDetails, confirmPassword: text })
                }
                placeholder="Confirm Password"
                mode="outlined"
                label="Confirm Password"
                isPasswordField
                error={!!formErrors.confirmPassword}
                helperText={
                  formErrors.confirmPassword || "Must match the password above."
                }
                helperTextColor={formErrors.confirmPassword ? "red" : "black"}
              />
            )}
            {authState === "login" && (
              <View style={{ alignItems: "flex-end" }}>
                <Typography
                  text={"Forgot Password"}
                  fontWeight={"bold"}
                  fontSize={12}
                  onPress={() => {
                    setAuthState("forgotpassword");
                  }}
                />
              </View>
            )}

            {/* Login Button */}
            <Button
              title={loginCtaLabel}
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
              text={
                !(authState === "signup")
                  ? "New here? Sign up now!"
                  : "Already Registered? Login"
              }
              fontWeight={"bold"}
              fontSize={12}
              onPress={() =>
                setAuthState(authState === "signup" ? "login" : "signup")
              }
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthForm;
