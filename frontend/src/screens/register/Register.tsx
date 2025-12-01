import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "../../components/context/ToastContext";
import axiosInstance from "../../utils/axiosInstance";
import AuthField from "../../components/login-register/AuthField";
import BackButton from "../../components/login-register/BackButton";
import { styles } from "./registerStyles";

export default function Register() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      showToast("error", "Họ và tên không được để trống");
      return false;
    }
    if (!username.trim()) {
      showToast("error", "Tên đăng nhập không được để trống");
      return false;
    }
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      showToast("error", "Tên đăng nhập phải có 3-20 ký tự (chữ, số, _)");
      return false;
    }
    if (!phone.trim()) {
      showToast("error", "Số điện thoại không được để trống");
      return false;
    }
    if (!email.trim()) {
      showToast("error", "Email không được để trống");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("error", "Email không hợp lệ");
      return false;
    }
    if (!password) {
      showToast("error", "Mật khẩu không được để trống");
      return false;
    }
    if (!confirmPassword) {
      showToast("error", "Vui lòng xác nhận mật khẩu");
      return false;
    }
    if (password !== confirmPassword) {
      showToast("error", "Mật khẩu xác nhận không khớp!");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", {
        username: username.trim(),
        password,
        fullName: fullName.trim(),
        phone: phone.trim().replace(/\s/g, ""),
        email: email.trim().toLowerCase(),
      });

      if (response.data) {
        showToast("success", "Đăng ký thành công! Vui lòng đăng nhập.");
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
      }
    } catch (error: any) {
      console.error("Register error:", error);
      if (error.response?.status === 400) {
        showToast("error", error.response.data.message || "Dữ liệu không hợp lệ");
      } else if (error.response?.status === 409) {
        showToast("error", "Tên đăng nhập hoặc email đã tồn tại");
      } else {
        showToast("error", "Đăng ký không thành công! Vui lòng thử lại.");
      }
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

              <TouchableOpacity
                onPress={async () => {
                  showToast("info", "Đang mở Google...");
                  // Reuse same Google OAuth hook as Login
                  navigation.navigate("Login");
                }}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA",
                  }}
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
