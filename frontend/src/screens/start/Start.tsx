import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import type { RootStackParamList } from "../../../App";
import { styles } from "./startStyles";

export default function Start() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace("Login");
    }, 1200);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Trekker</Text>
    </SafeAreaView>
  );
}
