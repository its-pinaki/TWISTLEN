import React from "react";
import { Button, Card } from "../src/components";

// Component Configurations
export const componentConfig = {
  button: [{ key: "label", defaultValue: "label" }],
  card: [
    { key: "title", defaultValue: "title" },
    { key: "description", defaultValue: "description" },
  ],
};

// Component Mapping
export const componentMapping = {
  button: Button,
  card: Card,
};
