import LoginForm from "@/components/src/organisms/LoginForm/LoginForm";
import Header from "@/components/src/atoms/Header/Header";
import Footer from "@/components/src/atoms/Footer/Footer";
import SignupForm from "@/components/src/organisms/SignUpForm/SignUpForm";
import ForgotPassword from "@/components/src/organisms/ForgotPassword/ForgotPassword";
import ChangePassword from "@/components/src/organisms/ChangePassword/ChangePassword";
import ProductListPage from "@/components/src/organisms/ProductListPage/ProductListPage";
import ProductDetails from "@/components/src/organisms/ProductDetails/ProductDetails";
import ProfilePage from "@/components/src/organisms/ProfilePage/ProfilePage";
import Checkout from "@/components/src/organisms/CheckOut/CheckOut";

export const components = [
  {
    name: "Checkout",
    component: Checkout,
  },
  {
    name: "LoginForm",
    component: LoginForm,
  },
  {
    name: "SignupForm",
    component: SignupForm,
  },
  {
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    name: "ChangePassword",
    component: ChangePassword,
  },
  {
    name: "ProductListPage",
    component: ProductListPage,
  },
  {
    name: "ProductDetails",
    component: ProductDetails,
  },
  {
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    name: "Header",
    component: Header,
  },
  {
    name: "Footer",
    component: Footer,
  },
];

export const componentMap = Object.fromEntries(
  components.map(({ name, component }) => [name, component])
);
