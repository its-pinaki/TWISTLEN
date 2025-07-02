import React, { useState } from "react";
import { SafeAreaView, ScrollView, useWindowDimensions, View } from "react-native";
import Typography from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import Toast from "../../atoms/Toast/Toast";
import { router } from "expo-router";

const ForgotPassword = ({
  emailPlaceHolder,
  emailLabel,
  emailErrorText,
  setPasswordCtaLabel = "Set Password",
}) => {
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "" });
  const [showToast, setShowToast] = useState({
    status: false,
    type: "success",
    header: "",
    subtext: "",
  });

  const handleSubmit = () => {
    // Basic validation
    if (!email) {
      setFormErrors({ email: "Email is required" });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormErrors({ email: "Please enter a valid email address" });
      return;
    }

    // If validation passes
    setFormErrors({ email: "" });
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
          <View style={{ alignItems: "center" }}>
            <IconBlock
              icon={{
                serviceType: "MaterialIcons",
                iconName: "password",
                size: 24,
                color: "black",
              }}
            />
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

            <Input
              value={email}
              onChangeText={setEmail}
              placeholder={emailPlaceHolder}
              mode="outlined"
              label={emailLabel}
              error={!!formErrors.email}
              helperText={formErrors.email || "Enter your registered email"}
              helperTextColor={formErrors.email ? "red" : "black"}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Button
              title={setPasswordCtaLabel}
              buttonColor={"#2e86de"}
              onPress={handleSubmit}
              style={{ width: "100%", marginTop: 20 }}
            />

            <Typography
              text={"Back to Login"}
              fontWeight={"bold"}
              fontSize={12}
              onPress={() => {
                router.push("(auth)/login");
              }}
              style={{ marginTop: 15 }}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
