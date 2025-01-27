import React from "react";

// Generic Button Component
const Button = ({ buttonText, borderRadius }) => {
  return (
    <button
      style={{
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: borderRadius || "5px",
      }}
    >
      {buttonText || "Default Button"}
    </button>
  );
};

// Generic Card Component
const Card = ({ title, description, borderRadius }) => {
  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: borderRadius || "5px",
        backgroundColor: "#f9f9f9",
        maxWidth: "250px",
      }}
    >
      <h3>{title || "Default Title"}</h3>
      <p>{description || "Default Description"}</p>
    </div>
  );
};

// Component Configurations
export const componentConfig = {
  button: [
    { key: "buttonText", defaultValue: "Click Me!" },
    { key: "borderRadius", defaultValue: "10px" },
  ],
  card: [
    { key: "title", defaultValue: "Card Title" },
    { key: "description", defaultValue: "Card Description" },
    { key: "borderRadius", defaultValue: "10px" },
  ],
};

// Component Mapping
export const componentMapping = {
  button: Button,
  card: Card,
};
