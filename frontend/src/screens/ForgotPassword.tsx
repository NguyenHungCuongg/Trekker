import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Register: undefined;
};

const BackButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path
          d="M14.469 6.414C14.792 6.673 14.844 7.145 14.586 7.468L10.96 12L14.586 16.531C14.844 16.855 14.792 17.327 14.469 17.586C14.145 17.844 13.673 17.792 13.414 17.469L9.414 12.469C9.195 12.195 9.195 11.805 9.414 11.531L13.414 6.531C13.673 6.208 14.145 6.156 14.469 6.414Z"
          fill="#1b1e28"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default function ForgotPassword() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        <View style={styles.body}>
          <BackButton />
          <View style={styles.content}>
            <Text style={styles.title}>Quên mật khẩu</Text>
            <Text style={styles.subtitle}>Nhập tài khoản email để khôi phục mật khẩu</Text>

            <TextInput style={styles.input} placeholder="www.uihut@gmail.com" defaultValue="www.uihut@gmail.com" />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Verification")}>
              <Text style={styles.buttonText}>Khôi phục mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF4F9",
  },
  frame: {
    width: 375,
    height: 812,
    backgroundColor: "#fff",
    borderRadius: 30,
    overflow: "hidden",
  },
  statusBar: {
    height: 48,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: { fontSize: 15, fontWeight: "600", color: "#1b1e28" },
  icons: { flexDirection: "row", gap: 12 },
  body: { flex: 1, padding: 20, paddingTop: 88 },
  backButton: {
    position: "absolute",
    top: 56,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F7F7F9",
    justifyContent: "center",
    alignItems: "center",
  },
  content: { marginTop: 30 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#1b1e28",
  },
  subtitle: {
    fontSize: 16,
    color: "#7d848d",
    textAlign: "center",
    marginTop: 10,
  },
  input: {
    height: 56,
    backgroundColor: "#F7F7F9",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginTop: 30,
  },
  button: {
    height: 56,
    backgroundColor: "#0f93c3",
    borderRadius: 16,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
