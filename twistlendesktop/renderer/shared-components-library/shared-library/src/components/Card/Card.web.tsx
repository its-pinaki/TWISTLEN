import React from "react";

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => (
  <div style={styles.card}>
    <h3 style={styles.title}>{title}</h3>
    <p style={styles.description}>{description}</p>
  </div>
);

const styles = {
  card: {
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    margin: "10px 0",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
  },
};

export default Card;
