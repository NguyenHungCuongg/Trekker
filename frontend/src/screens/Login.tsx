import React, { useState, ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import type { RootStackParamList } from "../../App";

const BackButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Start")}>
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path
          d="M14.469 6.414C14.792 6.673 14.844 7.145 14.586 7.468L10.96 12L14.586 16.531C14.844 16.855 14.792 17.327 14.469 17.586C14.145 17.844 13.673 17.792 13.414 17.469L9.414 12.469C9.195 12.195 9.195 11.805 9.414 11.531L13.414 6.531C13.673 6.208 14.145 6.156 14.469 6.414Z"
          fill="#1b1e28"
        />
      </Svg>
    </TouchableOpacity>
  );
};

const AuthField = ({ label, children }: { label: string; children?: ReactNode }) => (
  <View style={styles.authField}>
    <Text style={styles.authLabel}>{label}</Text>
    <View style={styles.authControl}>{children}</View>
  </View>
);

const PasswordField = () => {
  const [secure, setSecure] = useState(true);
  return (
    <AuthField label="Mật khẩu">
      <TextInput
        style={styles.authInput}
        placeholder="••••••••"
        secureTextEntry={secure}
        placeholderTextColor="#7d848d"
      />
      <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.passwordToggle}>
        <Ionicons name={secure ? "eye-off-outline" : "eye-outline"} size={22} color="#7d848d" />
      </TouchableOpacity>
    </AuthField>
  );
};

const SocialButton = ({ icon }: { icon: ReactNode }) => (
  <TouchableOpacity style={styles.socialButton}>{icon}</TouchableOpacity>
);

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.loginPage}>
      <View style={styles.loginFrame}>
        <BackButton />

        <View style={styles.loginBody}>
          <View style={styles.loginHeader}>
            <Text style={styles.loginTitle}>Đăng nhập</Text>
            <Text style={styles.loginSubtitle}>Vui lòng đăng nhập để tiếp tục</Text>
          </View>

          <View style={styles.loginFields}>
            <AuthField label="Tên đăng nhập">
              <TextInput style={styles.authInput} placeholder="Tên đăng nhập" placeholderTextColor="#7d848d" />
            </AuthField>

            <PasswordField />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.forgotLink}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <View style={styles.primaryCta}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.auxiliary}>
            <View style={styles.signupText}>
              <Text style={{ color: "#7d848d" }}>Bạn chưa có tài khoản?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}> Đăng ký</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.alternateDivider}>Hoặc đăng nhập bằng</Text>

            <View style={styles.socialRow}>
              <SocialButton icon={<Ionicons name="logo-facebook" size={28} color="#1877F2" />} />
              <SocialButton icon={<Ionicons name="logo-instagram" size={28} color="#EA4335" />} />
              <SocialButton icon={<Ionicons name="logo-twitter" size={28} color="#03A9F4" />} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // === Converted CSS ===
  loginPage: {
    minHeight: "100%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#eff4f9",
  },
  loginFrame: {
    width: 375,
    maxWidth: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    shadowColor: "#152242",
    shadowOffset: { width: 0, height: 35 },
    shadowOpacity: 0.15,
    shadowRadius: 60,
    elevation: 15,
    overflow: "hidden",
  },
  loginBody: {
    flex: 1,
    paddingTop: 88,
    paddingHorizontal: 20,
    paddingBottom: 72,
    gap: 28,
  },
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
  loginHeader: {
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
  },
  loginSubtitle: {
    fontSize: 16,
    color: "#7d848d",
  },
  loginFields: {
    flexDirection: "column",
    gap: 20,
  },
  authField: {
    flexDirection: "column",
    gap: 6,
  },
  authLabel: {
    fontSize: 14,
    color: "#7d848d",
  },
  authControl: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 18,
    backgroundColor: "#f7f7f9",
    borderRadius: 14,
  },
  authInput: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 0,
    fontSize: 16,
    color: "#1b1e28",
  },
  passwordToggle: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotLink: {
    alignSelf: "flex-end",
    fontSize: 14,
    color: "#0f93c3",
    marginTop: 8,
  },
  primaryCta: { marginTop: 8 },
  primaryButton: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    backgroundColor: "#0f93c3",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  auxiliary: {
    alignItems: "center",
    gap: 24,
    marginTop: "auto",
  },
  signupText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  link: { color: "#0f93c3", textDecorationLine: "none" },
  alternateDivider: { fontSize: 14, color: "#707b81" },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0f1928",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
  },
  homeIndicator: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    width: 134,
    height: 5,
    backgroundColor: "#1b1e28",
    borderRadius: 100,
  },
});
