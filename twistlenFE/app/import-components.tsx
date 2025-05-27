import AuthForm from "@/components/src/organisms/AuthForm/AuthForm";
import Header from "@/components/src/atoms/Header/Header";
import Footer from "@/components/src/atoms/Footer/Footer";

export const components = [
  {
    name: "AuthForm",
    component: AuthForm,
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
