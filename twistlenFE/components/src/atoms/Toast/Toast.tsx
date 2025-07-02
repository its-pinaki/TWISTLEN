import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

// Define toast types
type ToastType = "info" | "success" | "error";

interface ToastProps {
  type: ToastType;
  header: string;
  subtext?: string;
  duration?: number; // Auto-hide duration in ms
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  type,
  header,
  subtext,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);
  const fadeAnim = new Animated.Value(1); // For fade animation

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onClose && onClose();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.toastContainer, styles[type], { opacity: fadeAnim }]}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.header, { color: styles[type].color }]}>{header}</Text>
        {subtext && (
          <Text style={[styles.subtext, { color: styles[type].color }]}>
            {subtext}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Text style={[styles.closeText, { color: styles[type].color }]}>✖</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 8,
    width: "100%",
  },
  textContainer: {
    flex: 1,
  },
  header: {
    fontWeight: "bold",
    fontSize: 10,
  },
  subtext: {
    fontSize: 8,
  },
  closeButton: {
    marginLeft: 8,
    padding: 4,
  },
  closeText: {
    fontSize: 18,
  },
  // Type-based colors
  info: {
    color: "#084298",
    backgroundColor: "#cfe2ff",
    borderColor: "#b6d4fe",
    borderWidth:0.5
  },
  success: {
    color: "#0f5132",
    backgroundColor: "#d1e7dd",
    borderColor: "#badbcc",
    borderWidth:0.5
  },
  error: {
    color: "#842029",
    backgroundColor: "#f8d7da",
    borderColor: "#f5c2c7",
    borderWidth:0.5
  },
});

export default Toast;
