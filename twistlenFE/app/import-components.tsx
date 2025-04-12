import AuthForm from "@/components/src/organisms/AuthForm/AuthForm";
export const components = [
  {
    name: "AuthForm",
    component: AuthForm,
  },
];

export const componentMap = Object.fromEntries(
  components.map(({ name, component }) => [name, component])
);
