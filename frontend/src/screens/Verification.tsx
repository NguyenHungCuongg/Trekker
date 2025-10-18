import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Register: undefined;
};

const BackButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.navigate("ForgotPassword")}
    >
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path
          d="M14.469 6.414C14.792 6.673 14.844 7.145 14.586 7.468L10.96 12L14.586 16.531C14.844 16.855 14.792 17.327 14.469 17.586C14.145 17.844 13.673 17.792 13.414 17.469L9.414 12.469C9.195 12.195 9.195 11.805 9.414 11.531L13.414 6.531C13.673 6.208 14.145 6.156 14.469 6.414Z"
          fill="#1b1e28"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default function Verification({ navigation }: any) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(86);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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

  const handleSubmit = () => {
    console.log("OTP:", otp.join(""));
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.body}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View style={styles.content}>
              <Text style={styles.title}>Xác thực OTP</Text>
              <Text style={styles.subtitle}>
                Nhập mã xác thực đã được gửi{"\n"}tới email của bạn
              </Text>

              <View style={styles.otpSection}>
                <Text style={styles.otpLabel}>Nhập mã OTP</Text>
                <View style={styles.otpInputs}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el!)}
                      style={styles.otpInput}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={(val) => handleChange(index, val)}
                      onKeyPress={({ nativeEvent }) =>
                        handleKeyPress(index, nativeEvent.key)
                      }
                    />
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitText}>Verify</Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
                  <Text
                    style={[styles.resendLink, timer > 0 && { opacity: 0.5 }]}
                  >
                    Gửi lại mã
                  </Text>
                </TouchableOpacity>
                <Text style={styles.timer}>{formatTime(timer)}</Text>
              </View>
            </View>
          </ScrollView>
          <BackButton />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff4f9",
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: 375,
    height: 812,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#152242",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
    overflow: "hidden",
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 72,
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
  },
  content: {
    alignItems: "center",
    gap: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1b1e28",
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
  },
  otpLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1b1e28",
    marginBottom: 16,
  },
  otpInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
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
  submitButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#0f93c3",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    marginTop: 24,
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
  homeIndicator: {
    position: "absolute",
    bottom: 12,
    left: "50%",
    width: 134,
    height: 5,
    backgroundColor: "#1b1e28",
    borderRadius: 100,
    transform: [{ translateX: -67 }],
  },
});
