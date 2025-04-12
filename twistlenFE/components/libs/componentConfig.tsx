import React from "react";
import AuthForm from "../src/organisms/AuthForm/AuthForm";

// Component Configurations
export const componentConfig = {
  AuthForm: [
    { key: "type", defaultValue: "login" },
    { key: "userIdPlaceHolder", defaultValue: "" },
    { key: "PasswordPlaceHolder", defaultValue: "" },
    { key: "loginCtaLabel", defaultValue: "" },
    { key: "loginIconLabel", defaultValue: "" },
    { key: "signupHeader", defaultValue: "" },
    { key: "signupSubTextRte", defaultValue: "" },
    { key: "loginHeader", defaultValue: "" },
    { key: "loginSubTextRte", defaultValue: "" },
    { key: "changepwrdHeader", defaultValue: "" },
    { key: "chngpwrdSubTextRte", defaultValue: "" },
    { key: "forgotpwrdHeader", defaultValue: "" },
    { key: "forgotpwrdSubTextRte", defaultValue: "" },
  ],
};

// Component Mapping
export const componentMapping = {
  AuthForm: AuthForm,
};
