import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../App";
import { useToast } from "../components/context/ToastContext";
import axiosInstance from "../utils/axiosInstance";
import BackButton from "../components/login&register/BackButton";

type VerificationRouteProp = RouteProp<RootStackParamList, "Verification">;

export default function Verification({ navigation }: any) {
  const route = useRoute<VerificationRouteProp>(); //Lấy xuống route object theo kiểu đã định nghĩa
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(86);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { email } = route.params; // Lấy email từ params của route object

  const { showToast } = useToast();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(86);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = async () => {
    console.log("OTP:", otp.join(""));
    console.log("Email:", email);
    if (otp.some((digit) => digit === "")) {
      showToast("error", "Vui lòng nhập đầy đủ mã OTP.");
      return;
    }
    try {
      const response = await axiosInstance.post("/verification-code/verify", {
        email: email,
        code: otp.join(""),
      });
      console.log("Response:", response.data);
      if (response.data.statusCode === 200) {
        showToast("success", "Xác thực OTP thành công.");
        navigation.navigate("ResetPassword", { email });
      } else {
        showToast("error", "Xác thực OTP thất bại.");
      }
    } catch (error) {
      showToast("error", "Xác thực OTP thất bại.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.frame}>
        <BackButton navigateTo="ForgotPassword" />

        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.title}>Xác thực OTP</Text>
            <Text style={styles.subtitle}>Nhập mã xác thực đã được gửi{"\n"}tới email của bạn</Text>
          </View>

          <View style={styles.otpSection}>
            <Text style={styles.otpLabel}>Nhập mã OTP</Text>
            <View style={styles.otpInputs}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(val) => handleChange(index, val)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                />
              ))}
            </View>
          </View>

          <View style={styles.primaryCta}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
              <Text style={styles.primaryButtonText}>Xác thực</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
              <Text style={[styles.resendLink, timer > 0 && { opacity: 0.5 }]}>Gửi lại mã</Text>
            </TouchableOpacity>
            <Text style={styles.timer}>{formatTime(timer)}</Text>
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
  otpSection: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  otpLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1b1e28",
  },
  otpInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
  },
  otpInput: {
    width: 46,
    height: 56,
    backgroundColor: "#f7f7f9",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
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
  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  resendLink: {
    fontSize: 14,
    color: "#7d848d",
  },
  timer: {
    fontSize: 14,
    color: "#7d848d",
  },
});
