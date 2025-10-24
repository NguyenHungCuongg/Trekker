import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../App";

interface BackButtonProps {
  navigateTo?: keyof RootStackParamList;
}

export default function BackButton(backButtonProps: BackButtonProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.navigate(backButtonProps.navigateTo || "Start")}
    >
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path
          d="M14.469 6.414C14.792 6.673 14.844 7.145 14.586 7.468L10.96 12L14.586 16.531C14.844 16.855 14.792 17.327 14.469 17.586C14.145 17.844 13.673 17.792 13.414 17.469L9.414 12.469C9.195 12.195 9.195 11.805 9.414 11.531L13.414 6.531C13.673 6.208 14.145 6.156 14.469 6.414Z"
          fill="#1b1e28"
        />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 56,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(247,247,249,0.95)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1b1e28",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 15 },
    shadowRadius: 30,
  },
});
