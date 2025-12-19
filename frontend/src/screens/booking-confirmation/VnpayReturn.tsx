import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../App";
import { styles } from "./vnpayReturnStyles";
import { formatNumber } from "../../utils/formatNumber";

type VnpayReturnNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VnpayReturn"
>;

export default function VnpayReturn() {
  const route = useRoute();
  const navigation = useNavigation<VnpayReturnNavigationProp>();
  const params = route.params as any;

  const status = params?.status || "unknown";
  const orderId = params?.orderId;
  const amount = params?.amount;
  const message = params?.message;
  const transactionNo = params?.transactionNo;
  const bankCode = params?.bankCode;

  const isSuccess = status === "success";

  useEffect(() => {
    console.log("VnpayReturn mounted!");
    console.log("Route name:", route.name);
    console.log("All params:", params);
  }, [params]);

  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };

  const handleViewBookings = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "MainTabs",
          params: {
            screen: "Profile",
            params: { showBookings: true },
          },
        },
      ],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.frame}>
        <View style={styles.body}>
          {/* Icon */}
          <View
            style={[
              styles.iconContainer,
              isSuccess ? styles.successIcon : styles.failureIcon,
            ]}
          >
            <Text style={styles.iconText}>{isSuccess ? "✓" : "✕"}</Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                isSuccess ? styles.successTitle : styles.failureTitle,
              ]}
            >
              {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}
            </Text>
            <Text style={styles.subtitle}>
              {isSuccess
                ? "Đặt chỗ của bạn đã được xác nhận. Chúng tôi sẽ liên hệ với bạn sớm nhất."
                : "Giao dịch không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ."}
            </Text>
          </View>

          {/* Details Card */}
          <View style={styles.detailsCard}>
            {orderId && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Mã đơn hàng:</Text>
                <Text style={styles.detailValue}>{orderId}</Text>
              </View>
            )}

            {transactionNo && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Mã giao dịch:</Text>
                <Text style={styles.detailValue}>{transactionNo}</Text>
              </View>
            )}

            {bankCode && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Ngân hàng:</Text>
                <Text style={styles.detailValue}>{bankCode}</Text>
              </View>
            )}

            {amount && (
              <>
                <View style={styles.divider} />
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Số tiền:</Text>
                  <Text style={[styles.detailValue, styles.detailValueHighlight]}>
                    {formatNumber(Number(amount))} VNĐ
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Error Message */}
          {!isSuccess && message && (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                {message || "Đã có lỗi xảy ra trong quá trình thanh toán."}
              </Text>
            </View>
          )}

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            {isSuccess ? (
              <>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleViewBookings}
                >
                  <Text style={styles.primaryButtonText}>
                    Xem đơn đặt chỗ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleGoHome}
                >
                  <Text style={styles.secondaryButtonText}>
                    Quay về trang chủ
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.primaryButtonText}>Thử lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleGoHome}
                >
                  <Text style={styles.secondaryButtonText}>
                    Quay về trang chủ
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}