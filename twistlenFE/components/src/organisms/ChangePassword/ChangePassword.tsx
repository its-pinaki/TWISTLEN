import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import Typography from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import Toast from "../../atoms/Toast/Toast";
import { router } from "expo-router";

const ChangePassword = ({
  // Title
  title = "Change Your Password",

  // Old Password Field
  oldPasswordPlaceholder = "Enter old password",
  oldPasswordLabel = "Old Password",
  oldPasswordErrorText = "Old password is required",

  // New Password Field
  newPasswordPlaceholder = "Enter new password",
  newPasswordLabel = "New Password",
  newPasswordErrorText = "New password is required",
  newPasswordHelperText = "Use 8+ characters with a mix of letters, numbers & symbols.",

  // Confirm Password Field
  confirmPasswordPlaceholder = "Confirm new password",
  confirmPasswordLabel = "Confirm Password",
  confirmPasswordErrorText = "Passwords must match",

  // Buttons
  submitButtonLabel = "Change Password",
  backButtonLabel = "Back to Login",

  // Messages
  successMessage = "Password changed successfully!",
  errorMessage = "Failed to change password. Please try again.",
}) => {
  const { height, width } = useWindowDimensions();
  const [formDetails, setFormDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showToast, setShowToast] = useState({
    status: false,
    type: "success",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formDetails.oldPassword) {
      errors.oldPassword = oldPasswordErrorText;
      isValid = false;
    }

    if (!formDetails.newPassword) {
      errors.newPassword = newPasswordErrorText;
      isValid = false;
    } else if (formDetails.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    if (formDetails.newPassword !== formDetails.confirmPassword) {
      errors.confirmPassword = confirmPasswordErrorText;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Replace with your actual password change API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowToast({
        status: true,
        type: "success",
        message: successMessage,
      });

      //   onChangePasswordSuccess?.();
    } catch (error) {
      setShowToast({
        status: true,
        type: "error",
        message: errorMessage,
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
            text={title}
            fontWeight={"bold"}
            fontSize={14}
            style={{ marginBottom: 16 }}
          />

          <Input
            value={formDetails.oldPassword}
            onChangeText={(text) =>
              setFormDetails({ ...formDetails, oldPassword: text })
            }
            placeholder={oldPasswordPlaceholder}
            label={oldPasswordLabel}
            isPasswordField
            error={!!formErrors.oldPassword}
            helperText={formErrors.oldPassword}
            helperTextColor="red"
          />

          <Input
            value={formDetails.newPassword}
            onChangeText={(text) =>
              setFormDetails({ ...formDetails, newPassword: text })
            }
            placeholder={newPasswordPlaceholder}
            label={newPasswordLabel}
            isPasswordField
            error={!!formErrors.newPassword}
            helperText={formErrors.newPassword || newPasswordHelperText}
            helperTextColor={formErrors.newPassword ? "red" : "black"}
          />

          <Input
            value={formDetails.confirmPassword}
            onChangeText={(text) =>
              setFormDetails({ ...formDetails, confirmPassword: text })
            }
            placeholder={confirmPasswordPlaceholder}
            label={confirmPasswordLabel}
            isPasswordField
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            helperTextColor="red"
          />

          <Button
            title={submitButtonLabel}
            buttonColor={"#2e86de"}
            onPress={handleSubmit}
            style={{ marginTop: 20 }}
            loading={isLoading}
            disabled={isLoading}
          />

          <Typography
            text={backButtonLabel}
            fontWeight={"bold"}
            fontSize={12}
            onPress={() => {
              router.push("/(auth)/login");
            }}
            style={{ marginTop: 15, textAlign: "center" }}
          />

          {showToast?.status && (
            <Toast
              type={showToast?.type}
              message={showToast?.message}
              duration={3000}
              onClose={() =>
                setShowToast((prev) => ({ ...prev, status: false }))
              }
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
