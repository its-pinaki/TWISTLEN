import React from "react";
import AuthForm from "../src/organisms/AuthForm/AuthForm";
import Header from "../src/atoms/Header/Header";
import Footer from "../src/atoms/Footer/Footer";

// Component Configurations
export const componentConfig = {
  AuthForm: [
    { key: "type", defaultValue: "login" },
    { key: "userIdPlaceHolder", defaultValue: "" },
    { key: "PasswordPlaceHolder", defaultValue: "" },
    { key: "loginCtaLabel", defaultValue: "" },

  ],
  Header: [
    { key: "logo", defaultValue: "" },
    { key: "navItems", defaultValue: [] },
    { key: "ctaText", defaultValue: "" },
    // { key: "isSmallScreen", defaultValue: false },
    // { key: "menuOpen", defaultValue: false },
  ],
  Footer:[
    { key: "logo", defaultValue: "" },
    { key: "connectTitle", defaultValue: "" },
    { key: "newsletterText", defaultValue: "" },
    { key: "emailPlaceholder", defaultValue: "" },
    { key: "subscribeText", defaultValue: "" },
    { key: "copyrightText", defaultValue: "" },
  ]
};

// Component Mapping
export const componentMapping = {
  AuthForm: AuthForm,
  Header: Header,
  Footer: Footer,
};
