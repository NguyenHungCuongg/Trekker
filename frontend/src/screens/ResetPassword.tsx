import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import BackButton from "../components/login&register/BackButton";
import PasswordField from "../components/login&register/PasswordField";
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

      if (response.data.success) {
        showToast("success", "Đặt lại mật khẩu thành công!");
        // Reset navigation stack về Login
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Đặt lại mật khẩu thất bại";
      showToast("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <BackButton navigateTo="Verification" />

          <View style={styles.content}>
            <Text style={styles.title}>Đặt lại mật khẩu</Text>
            <Text style={styles.subtitle}>Nhập mật khẩu mới cho tài khoản {email}</Text>

            <View style={styles.form}>
              <PasswordField label="Mật khẩu mới" value={newPassword} onChangeText={setNewPassword} />

              <PasswordField label="Xác nhận mật khẩu" value={confirmPassword} onChangeText={setConfirmPassword} />

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleResetPassword}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>{isLoading ? "Đang xử lý..." : "Xác nhận"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 32,
    lineHeight: 22,
  },
  form: {
    gap: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: "#B0B0B0",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
