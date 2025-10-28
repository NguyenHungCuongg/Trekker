import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import type { RootStackParamList } from "../../App";

export default function Start() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace("Login"); // đổi "Login" thành screen bạn muốn
    }, 1200);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <Text style={styles.title}>Trekker</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00B5C3",
    alignItems: "center",
    justifyContent: "center",
  },
  statusBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  batteryContainer: {
    position: "relative",
    marginLeft: 5,
  },
  batteryOutline: {
    width: 22,
    height: 11,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "white",
    opacity: 0.35,
  },
  batteryFill: {
    position: "absolute",
    left: 2,
    top: 2,
    width: 18,
    height: 7,
    borderRadius: 2,
    backgroundColor: "white",
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "white",
    textAlign: "center",
  },
});
