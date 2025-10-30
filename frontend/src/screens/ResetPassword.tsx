import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import BackButton from "../components/login-register/BackButton";
import PasswordField from "../components/login-register/PasswordField";
import { useToast } from "../components/context/ToastContext";
import axiosInstance from "../utils/axiosInstance";

type Props = NativeStackScreenProps<RootStackParamList, "ResetPassword">;

export default function ResetPassword({ navigation, route }: Props) {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleResetPassword = async () => {
    // Validation
    if (!newPassword || !confirmPassword) {
      showToast("error", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (newPassword.length < 6) {
      showToast("error", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("error", "Mật khẩu xác nhận không khớp");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        email,
        newPassword,
      });

      console.log("Reset Password Response:", response.data);

      if (response.data && response.data.success) {
        showToast("success", response.data.message || "Đặt lại mật khẩu thành công!");
        // Reset navigation stack về Login
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        showToast("error", response.data?.message || "Đặt lại mật khẩu thất bại");
      }
    } catch (error: any) {
      console.error("Reset Password Error:", error);
      console.error("Error Response:", error.response?.data);

      const errorMessage = error.response?.data?.message || error.message || "Đặt lại mật khẩu thất bại";

      showToast("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.frame}>
        <BackButton navigateTo="Verification" />

        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.title}>Đặt lại mật khẩu</Text>
            <Text style={styles.subtitle}>Nhập mật khẩu mới cho tài khoản {email}</Text>
          </View>

          <View style={styles.fields}>
            <PasswordField
              label="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <PasswordField
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <View style={styles.primaryCta}>
            <TouchableOpacity
              style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              <Text style={styles.primaryButtonText}>{isLoading ? "Đang xử lý..." : "Xác nhận"}</Text>
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
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
