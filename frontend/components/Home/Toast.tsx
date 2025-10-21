import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ToastType = "success" | "warning" | "error";

interface ToastProps {
  visible: boolean;
  type: ToastType;
  message: string;
  onHide: () => void;
  duration?: number;
}

const Toast = ({ visible, type, message, onHide, duration = 3000 }: ToastProps) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(-100);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const config = {
    success: {
      icon: "checkmark-circle",
      color: "#10b981",
      bg: "#d1fae5",
      border: "#6ee7b7",
    },
    warning: {
      icon: "alert-circle",
      color: "#f59e0b",
      bg: "#fef3c7",
      border: "#fcd34d",
    },
    error: {
      icon: "close-circle",
      color: "#ef4444",
      bg: "#fee2e2",
      border: "#fca5a5",
    },
  };

  const { icon, color, bg, border } = config[type];

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: bg, borderColor: border },
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Ionicons name={icon as any} size={24} color={color} />
      <Text style={[styles.message, { color }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 9999,
  },
  message: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },
});

export default Toast;