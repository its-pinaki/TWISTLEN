import React from "react";
import LoginForm from "../src/organisms/LoginForm/LoginForm";
import Header from "../src/atoms/Header/Header";
import Footer from "../src/atoms/Footer/Footer";
import SignupForm from "../src/organisms/SignUpForm/SignUpForm";
import ForgotPassword from "../src/organisms/ForgotPassword/ForgotPassword";
import ChangePassword from "../src/organisms/ChangePassword/ChangePassword";
import ProductListPage from "../src/organisms/ProductListPage/ProductListPage";
import ProductDetails from "../src/organisms/ProductDetails/ProductDetails";
import ProfilePage from "../src/organisms/ProfilePage/ProfilePage";
import Checkout from "../src/organisms/CheckOut/CheckOut";
import QueryDetails from "../src/organisms/QueryDetails/QueryDetails";
import HomePage from "../src/organisms/HomePage/HomePage";

// Component Configurations
export const componentConfig = {
  LoginForm: [
    { key: "loginLabel", defaultValue: "" },
    { key: "userIdPlaceHolder", defaultValue: "" },
    { key: "userIdHelperText", defaultValue: "" },
    { key: "userIdLabel", defaultValue: "" },
    { key: "userIdErrorText", defaultValue: "" },
    { key: "passwordPlaceHolder", defaultValue: "" },
    { key: "passwordLabel", defaultValue: "" },
    { key: "passwordInfoText", defaultValue: "" },
    { key: "passwordErrorText", defaultValue: "" },
    { key: "headerrrorText", defaultValue: "" },
    { key: "loginCtaLabel", defaultValue: "" },
    { key: "signupCtaLabel", defaultValue: "" },
    { key: "forgotPasswordCtaLabel", defaultValue: "" },
  ],
  SignupForm: [
    { key: "signupLabel", defaultValue: "" },
    { key: "userIdPlaceHolder", defaultValue: "" },
    { key: "userIdHelperText", defaultValue: "" },
    { key: "userIdLabel", defaultValue: "" },
    { key: "userIdErrorText", defaultValue: "" },
    { key: "emailPlaceHolder", defaultValue: "" },
    { key: "emailLabel", defaultValue: "" },
    { key: "emailErrorText", defaultValue: "" },
    { key: "passwordPlaceHolder", defaultValue: "" },
    { key: "passwordLabel", defaultValue: "" },
    { key: "passwordInfoText", defaultValue: "" },
    { key: "passwordErrorText", defaultValue: "" },
    { key: "confirmPasswordPlaceHolder", defaultValue: "" },
    { key: "confirmPasswordLabel", defaultValue: "" },
    { key: "confirmPasswordErrorText", defaultValue: "" },
    { key: "headerErrorText", defaultValue: "" },
    { key: "signupCtaLabel", defaultValue: "" },
    { key: "loginCtaLabel", defaultValue: "" },
  ],
  ForgotPassword: [
    { key: "emailPlaceHolder", defaultValue: "" },
    { key: "emailLabel", defaultValue: [] },
    { key: "emailErrorText", defaultValue: "" },
    { key: "setPasswordCtaLabel", defaultValue: "" },
  ],
  ChangePassword: [
    { key: "title", defaultValue: "" },
    { key: "oldPasswordPlaceholder", defaultValue: [] },
    { key: "oldPasswordLabel", defaultValue: "" },
    { key: "oldPasswordErrorText", defaultValue: "" },
    { key: "newPasswordPlaceholder", defaultValue: "" },
    { key: "newPasswordLabel", defaultValue: "" },
    { key: "newPasswordErrorText", defaultValue: "" },
    { key: "newPasswordHelperText", defaultValue: "" },
    { key: "confirmPasswordPlaceholder", defaultValue: "" },
    { key: "confirmPasswordLabel", defaultValue: "" },
    { key: "confirmPasswordErrorText", defaultValue: "" },
    { key: "submitButtonLabel", defaultValue: "" },
    { key: "backButtonLabel", defaultValue: "" },
    { key: "successMessage", defaultValue: "" },
    { key: "errorMessage", defaultValue: "" },
  ],
  ProductListPage: [{ key: "title", defaultValue: "" }],
  ProductDetails: [{ key: "title", defaultValue: "" }],
  ProfilePage: [{ key: "title", defaultValue: "" }],
  Checkout: [{ key: "title", defaultValue: "" }],
  HomePage: [{ key: "title", defaultValue: "" }],
  Header: [
    { key: "logo", defaultValue: "" },
    { key: "navItems", defaultValue: [] },
    { key: "ctaText", defaultValue: "" },
    // { key: "isSmallScreen", defaultValue: false },
    // { key: "menuOpen", defaultValue: false },
  ],
  Footer: [
    { key: "logo", defaultValue: "" },
    { key: "connectTitle", defaultValue: "" },
    { key: "newsletterText", defaultValue: "" },
    { key: "emailPlaceholder", defaultValue: "" },
    { key: "subscribeText", defaultValue: "" },
    { key: "copyrightText", defaultValue: "" },
  ],
  QueryDetails: [{ key: "title", defaultValue: "" }],
};

// Component Mapping
export const componentMapping = {
  LoginForm: LoginForm,
  SignupForm: SignupForm,
  ForgotPassword: ForgotPassword,
  ChangePassword: ChangePassword,
  ProductListPage: ProductListPage,
  ProductDetails: ProductDetails,
  ProfilePage: ProfilePage,
  Checkout: Checkout,
  Header: Header,
  Footer: Footer,
  QueryDetails: QueryDetails,
  HomePage: HomePage,
};
