// components/auth/SignupForm.tsx

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { signupUser } from "../../services/signup.services";
import { router } from "expo-router";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import Typography from "../../atoms/Typography/Typography";
import Toast from "../../atoms/Toast/Toast";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { isValidEmail, isValidPassword, isValidUserId } from "../../utils/shared.utils";

type SignupFormProps = {
  signupLabel?: string;
  userIdPlaceHolder?: string;
  userIdHelperText?: string;
  userIdLabel?: string;
  userIdErrorText?: string;
  emailPlaceHolder?: string;
  emailLabel?: string;
  emailErrorText?: string;
  passwordPlaceHolder?: string;
  passwordLabel?: string;
  passwordInfoText?: string;
  passwordErrorText?: string;
  confirmPasswordPlaceHolder?: string;
  confirmPasswordLabel?: string;
  confirmPasswordErrorText?: string;
  headerErrorText?: string;
  signupCtaLabel?: string;
  loginCtaLabel?: string;
};

const SignupForm: React.FC<SignupFormProps> = (props) => {
  const { height, width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showToast, setShowToast] = useState({
    status: false,
    type: "success" as "success" | "error",
    header: "",
    subtext: "",
  });

  const validateField = () => {
    let errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let valid = true;

    // Username validation
    if (!formDetails.username) {
      errors.username = props?.userIdErrorText || "Username is required";
      valid = false;
    } else if (isValidUserId(formDetails.username)) {
      errors.username = "Please enter a valid username";
      valid = false;
    }

    // Email validation
    if (!formDetails.email) {
      errors.email = props?.emailErrorText || "Email is required";
      valid = false;
    } else if (!isValidEmail(formDetails.email)) {
      errors.email = "Please enter a valid email address";
      valid = false;
    }

    // Password validation
    if (!formDetails.password) {
      errors.password = props?.passwordErrorText || "Password is required";
      valid = false;
    } else if (!isValidPassword(formDetails.password)) {
      errors.password = "Password must be at least 8 characters with at least one uppercase, one lowercase, one number, and one special character";
      valid = false;
    }

    // Confirm password validation
    if (!formDetails.confirmPassword) {
      errors.confirmPassword = props?.confirmPasswordErrorText || "Please confirm your password";
      valid = false;
    } else if (formDetails.password !== formDetails.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const signupHandler = async () => {
    if (!validateField()) return;
    
    setIsLoading(true);
    try {
      const result = await signupUser(
        formDetails.username,
        formDetails.email,
        formDetails.password,
        "Merchant" // Hardcoded as "Merchant" as per requirement
      );

      if (result.success) {
        setShowToast({
          status: true,
          type: "success",
          header: "Registration Successful",
          subtext: result.message || "You can now login with your credentials",
        });
        // Optionally redirect to login after successful registration
        setTimeout(() => router.replace("/(auth)/login"), 2000);
      } else {
        setShowToast({
          status: true,
          type: "error",
          header: "Registration Failed",
          subtext: result.message || "Please try again.",
        });
      }
    } catch (error) {
      setShowToast({
        status: true,
        type: "error",
        header: "Error",
        subtext: "An unexpected error occurred. Please try again.",
      });
    } finally {
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
          paddingHorizontal: width * 0.05,
        }}
      >
        <View
          style={{ 
            backgroundColor: "white", 
            padding: 20, 
            borderRadius: 10,
            width: width * 0.9,
            maxWidth: 400,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <IconBlock
              icon={{
                serviceType: "AntDesign",
                iconName: "adduser",
                size: 24,
                color: "black",
              }}
            />
            <Typography
              text={props?.signupLabel || "Create an Account"}
              fontWeight={"bold"}
              fontSize={18}
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

          {/* Username Input */}
          <Input
            value={formDetails.username}
            onChangeText={(text) =>
              setFormDetails({ ...formDetails, username: text })
            }
            placeholder={props?.userIdPlaceHolder || "Enter your username"}
            mode="outlined"
            label={props?.userIdLabel || "Username"}
            error={!!formErrors.username}
            helperText={formErrors.username || props?.userIdHelperText}
            helperTextColor={formErrors.username ? "red" : "black"}
          />

          {/* Email Input */}
          <Input
            value={formDetails.email}
            onChangeText={(text) =>
              setFormDetails({ ...formDetails, email: text })
            }
            placeholder={props?.emailPlaceHolder || "Enter your email"}
            mode="outlined"
            label={props?.emailLabel || "Email"}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!formErrors.email}
            helperText={formErrors.email}
            helperTextColor={formErrors.email ? "red" : "black"}
          />

          {/* Password Input */}
          <Input
            value={formDetails.password}
            onChangeText={(text) =>
              setFormDetails({ ...formDetails, password: text })
            }
            placeholder={props?.passwordPlaceHolder || "Enter your password"}
            mode="outlined"
            label={props?.passwordLabel || "Password"}
            isPasswordField
            error={!!formErrors.password}
            helperText={formErrors.password || props?.passwordInfoText}
            helperTextColor={formErrors.password ? "red" : "black"}
          />

          {/* Confirm Password Input */}
          <Input
            value={formDetails.confirmPassword}
            onChangeText={(text) =>
              setFormDetails({ ...formDetails, confirmPassword: text })
            }
            placeholder={props?.confirmPasswordPlaceHolder || "Confirm your password"}
            mode="outlined"
            label={props?.confirmPasswordLabel || "Confirm Password"}
            isPasswordField
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            helperTextColor={formErrors.confirmPassword ? "red" : "black"}
          />

          {/* Signup Button */}
          <Button
            title={props?.signupCtaLabel || "Sign Up"}
            buttonColor={"#2e86de"}
            onPress={signupHandler}
            horizontalPadding={width * 0.02}
            verticalPadding={height * 0.015}
            style={{ width: "100%", marginTop: 20 }}
            loading={isLoading}
            disabled={isLoading}
          />

          {/* Toggle Between Signup & Login */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
            <Typography
              text={props?.loginCtaLabel || "Login"}
              fontWeight={"bold"}
              fontSize={12}
              onPress={() => {
                router.push("/(auth)/login");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupForm;