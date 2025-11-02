import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../App";
import { useToast } from "../../components/context/ToastContext";
import axiosInstance from "../../utils/axiosInstance";
import BackButton from "../../components/login-register/BackButton";
import { styles } from "./verificationStyles";

type VerificationRouteProp = RouteProp<RootStackParamList, "Verification">;

export default function Verification({ navigation }: any) {
  const route = useRoute<VerificationRouteProp>();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(86);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { email } = route.params;
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
