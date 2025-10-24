import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "../components/context/ToastContext";
import axiosInstance from "../utils/axiosInstance";

const RegisterField = ({
  label,
  type = "default",
  placeholder,
  showPasswordToggle,
  value,
  setValue,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  showPasswordToggle?: boolean;
  value?: string;
  setValue?: (value: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.fieldContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || label}
        placeholderTextColor="#7d848d"
        secureTextEntry={showPasswordToggle && !showPassword}
        keyboardType={type === "tel" ? "phone-pad" : "default"}
        value={value}
        onChangeText={setValue}
      />
      {showPasswordToggle && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
          <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#7d848d" />
        </TouchableOpacity>
      )}
    </View>
  );
};

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
      showToast("error", "Đăng ký không thành công!");
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        {/* Nội dung cuộn */}
        <ScrollView contentContainerStyle={styles.body}>
          {/* Nút back */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Start")}>
            <Ionicons name="chevron-back" size={24} color="#1b1e28" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Đăng ký</Text>
            <Text style={styles.subtitle}>Vui lòng điền các thông tin sau</Text>

            <View style={styles.fields}>
              <RegisterField label="Họ và tên" value={fullName} setValue={setFullName} />
              <RegisterField label="Tên đăng nhập" value={username} setValue={setUsername} />
              <RegisterField label="Số điện thoại" type="tel" value={phone} setValue={setPhone} />
              <RegisterField label="Email" type="email" value={email} setValue={setEmail} />
              <RegisterField label="Mật khẩu" showPasswordToggle value={password} setValue={setPassword} />
              <RegisterField
                label="Xác nhận mật khẩu"
                showPasswordToggle
                value={confirmPassword}
                setValue={setConfirmPassword}
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
    shadowOffset: { width: 0, height: 35 },
    shadowOpacity: 0.15,
    shadowRadius: 60,
    elevation: 15,
    overflow: "hidden",
  },
  body: {
    paddingTop: 88,
    paddingHorizontal: 20,
    paddingBottom: 72,
    gap: 28,
    width: "100%", // ← THÊM dòng này
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: 20,
    backgroundColor: "rgba(247,247,249,0.95)",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1b1e28",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 15 },
    shadowRadius: 30,
  },
  header: {
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    width: "100%", // ← THÊM dòng này
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
    width: "100%", // ← THÊM dòng này
  },
  fieldContainer: {
    backgroundColor: "#f7f7f9",
    borderRadius: 14,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    width: "100%", // ← THÊM dòng này
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1b1e28",
  },
  eyeButton: {
    marginLeft: 10,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
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
    width: "100%", // ← THÊM dòng này
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
