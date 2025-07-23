import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface AutoRotatingCardGroupProps {
  title: string;
  items: string[];
  intervalMs?: number;
  itemsPerSlide?: number;
}

const AutoRotatingCardGroup: React.FC<AutoRotatingCardGroupProps> = ({
  title,
  items,
  intervalMs = 5000,
  itemsPerSlide = 3,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + itemsPerSlide) % items.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [items, intervalMs, itemsPerSlide]);

  const getCurrentItems = () => {
    const current = items.slice(index, index + itemsPerSlide);
    if (current.length < itemsPerSlide) {
      return [...current, ...items.slice(0, itemsPerSlide - current.length)];
    }
    return current;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        💡 <Text style={{ fontWeight: "bold" }}>{title}</Text>
      </Text>
      <View
        style={{
          $$css: true,
          _: "d-flex flex-col sm:flex-row gap-2 justify-between",
        }}
      >
        {getCurrentItems().map((item, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.cardText}>💡 {item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#eee",
    borderWidth: 1,
    margin: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f9f9fb",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 3,
  },
  cardText: {
    fontSize: 14,
  },
});

export default AutoRotatingCardGroup;
