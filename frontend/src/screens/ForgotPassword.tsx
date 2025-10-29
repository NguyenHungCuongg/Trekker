import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";
import { useToast } from "../components/context/ToastContext";
import axiosInstance from "../utils/axiosInstance";
import BackButton from "../components/login&register/BackButton";

export default function ForgotPassword() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSentOTP = async () => {
    if (!email) {
      showToast("error", "Vui lòng nhập email khôi phục.");
      return;
    }
    try {
      console.log(email);
      const response = await axiosInstance.post("/verification-code/generate", {
        email: email,
      });
      console.log("Response:", response.data);
      if (response.data.statusCode === 200) {
        showToast("success", "Đã gửi mã OTP đến email của bạn.");
        navigation.navigate("Verification", { email });
      } else {
        showToast("error", "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (error) {
      showToast("error", "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.frame}>
        <BackButton navigateTo="Login" />

        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.title}>Quên mật khẩu</Text>
            <Text style={styles.subtitle}>Nhập tài khoản email để khôi phục mật khẩu</Text>
          </View>

          <View style={styles.fields}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="your-email@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.primaryCta}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleSentOTP}>
              <Text style={styles.primaryButtonText}>Khôi phục mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
    minHeight: 750,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#152242",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    overflow: "hidden",
    position: "relative",
  },
  body: {
    flex: 1, // ✅ Thêm flex để body chiếm hết không gian
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
  inputWrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1b1e28",
  },
  input: {
    height: 56,
    backgroundColor: "#f7f7f9",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1b1e28",
  },
  primaryCta: {
    marginTop: 8,
  },
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
});
