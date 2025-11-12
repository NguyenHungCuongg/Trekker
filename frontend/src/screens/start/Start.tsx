import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import type { RootStackParamList } from "../../../App";
import { styles } from "./startStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Start() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      let t;
      if (token !== null) {
        t = setTimeout(() => {
          navigation.replace("MainTabs");
        }, 1200);
      } else {
        t = setTimeout(() => {
          navigation.replace("Login");
        }, 1200);
      }
      return () => clearTimeout(t);
    };
    checkAuth();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Trekker</Text>
    </SafeAreaView>
  );
}
