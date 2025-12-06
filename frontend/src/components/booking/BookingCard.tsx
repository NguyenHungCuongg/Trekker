import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatNumber } from "../../utils/formatNumber";
import { styles } from "./bookingCardStyles";

interface BookingItem {
  id: number;
  serviceType: "tour" | "accommodation";
  serviceId: number;
  quantity: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: "vnpay" | "cash";
  createdAt: string;
  tour?: {
    id: number;
    name: string;
    image: string;
    location: { name: string };
  };
  accommodation?: {
    id: number;
    name: string;
    image: string;
    address: string;
  };
}

interface BookingCardProps {
  booking: BookingItem;
  onPress?: () => void;
}

export default function BookingCard({ booking, onPress }: BookingCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#FF9800";
      case "confirmed":
        return "#4CAF50";
      case "cancelled":
        return "#F44336";
      default:
        return "#7D848D";
    }
  };

  const serviceName = booking.serviceType === "tour" ? booking.tour?.name : booking.accommodation?.name;
  const serviceImage = booking.serviceType === "tour" ? booking.tour?.image : booking.accommodation?.image;
  const serviceLocation =
    booking.serviceType === "tour" ? booking.tour?.location?.name : booking.accommodation?.address;

  return (
    <TouchableOpacity style={styles.bookingCard} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.serviceTypeTag}>
          <Text style={styles.serviceTypeText}>{booking.serviceType === "tour" ? "Tour" : "Chỗ ở"}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
          <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        {serviceImage && (
          <Image
            source={{ uri: serviceImage }}
            style={styles.serviceImage}
            defaultSource={require("../../../assets/default-thumbnail.png")}
          />
        )}
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName} numberOfLines={2}>
            {serviceName}
          </Text>
          {serviceLocation && (
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={14} color="#7D848D" />
              <Text style={styles.locationText} numberOfLines={1}>
                {serviceLocation}
              </Text>
            </View>
          )}
          <View style={styles.dateRow}>
            <Feather name="calendar" size={14} color="#7D848D" />
            <Text style={styles.dateText}>
              {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
            </Text>
          </View>
          <View style={styles.quantityRow}>
            <Feather name="users" size={14} color="#7D848D" />
            <Text style={styles.quantityText}>{booking.quantity} người</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.paymentInfo}>
          <Feather name={booking.paymentMethod === "cash" ? "dollar-sign" : "credit-card"} size={16} color="#7D848D" />
          <Text style={styles.paymentText}>{booking.paymentMethod === "cash" ? "Tiền mặt" : "VNPAY"}</Text>
        </View>
        <Text style={styles.totalPrice}>{formatNumber(booking.totalPrice)} VND</Text>
      </View>
    </TouchableOpacity>
  );
}
