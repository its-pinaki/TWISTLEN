import React from "react";

type RTEProps = {
  component: React.ReactElement;
};

const RTE: React.FC<RTEProps> = ({ component }) => {
  return component;
};

export default RTE;
