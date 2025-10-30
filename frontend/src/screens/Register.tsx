import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "../components/context/ToastContext";
import axiosInstance from "../utils/axiosInstance";
import AuthField from "../components/login-register/AuthField";
import BackButton from "../components/login-register/BackButton";

export default function Register() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      showToast("error", "Mật khẩu xác nhận không khớp!");
      return;
    }
    if (!fullName || !username || !phone || !email || !password || !confirmPassword) {
      showToast("error", "Vui lòng điền đầy đủ thông tin đăng ký!");
      return;
    }
    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        password,
        fullName,
        phone,
        email,
      });
      if (response.data) {
        showToast("success", "Đăng ký thành công! Vui lòng đăng nhập.");
        navigation.navigate("Login");
      }
    } catch (error) {
      showToast("error", "Đăng ký không thành công!" + error);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        {/* Nội dung cuộn */}
        <ScrollView contentContainerStyle={styles.body}>
          <BackButton navigateTo="Login" />

          <View style={styles.header}>
            <Text style={styles.title}>Đăng ký</Text>
            <Text style={styles.subtitle}>Vui lòng điền các thông tin sau</Text>

            <View style={styles.fields}>
              <AuthField label="Họ và tên" placeholder="Nhập họ và tên" value={fullName} onChangeText={setFullName} />
              <AuthField
                label="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChangeText={setUsername}
              />
              <AuthField
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              <AuthField
                label="Email"
                placeholder="Nhập email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <AuthField
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <AuthField
                label="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
              <Text style={styles.primaryButtonText}>Đăng ký</Text>
            </TouchableOpacity>

            <View style={styles.auxiliary}>
              <View style={styles.signinRow}>
                <Text style={styles.signinText}>Bạn đã có tài khoản?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.signinLink}> Đăng nhập</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.divider}>Hoặc xác thực bằng</Text>

              <View style={styles.socialRow}>
                <Ionicons name="logo-facebook" size={40} color="#1877F2" />
                <Ionicons name="logo-instagram" size={40} color="#C13584" />
                <Ionicons name="logo-twitter" size={40} color="#03A9F4" />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    minHeight: "100%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#eff4f9",
  },
  frame: {
    width: 375,
    maxWidth: "100%",
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#152242",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    overflow: "hidden",
  },
  body: {
    paddingTop: 88,
    paddingHorizontal: 20,
    paddingBottom: 72,
    gap: 28,
    width: "100%",
  },
  header: {
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    width: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7d848d",
    textAlign: "center",
  },
  fields: {
    flexDirection: "column",
    gap: 20,
    width: "100%",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#0f93c3",
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
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
    width: "100%",
  },
  signinRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  signinText: {
    color: "#7d848d",
  },
  signinLink: {
    color: "#0f93c3",
    textDecorationLine: "none",
  },
  divider: {
    color: "#707b81",
    fontSize: 14,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },
});
