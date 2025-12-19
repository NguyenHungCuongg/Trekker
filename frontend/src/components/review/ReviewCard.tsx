import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./reviewCardStyles";

interface ReviewItem {
  id: number;
  serviceType: "tour" | "accommodation";
  serviceId: number;
  serviceName: string;
  serviceImage: string;
  serviceLocation: string;
  hasReviewed: boolean;
  rating?: number;
  comment?: string;
  reviewDate?: string;
}

interface ReviewCardProps {
  review: ReviewItem;
  onReviewPress: (review: ReviewItem) => void;
}

export default function ReviewCard({ review, onReviewPress }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Feather
          key={i}
          name={i <= rating ? "star" : "star"}
          size={16}
          color={i <= rating ? "#FFB800" : "#E0E0E0"}
          style={{ marginRight: 4 }}
        />
      );
    }
    return stars;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <View style={styles.reviewCard}>
      <View style={styles.cardHeader}>
        <View style={styles.serviceTypeTag}>
          <Text style={styles.serviceTypeText}>{review.serviceType === "tour" ? "Tour" : "Chỗ ở"}</Text>
        </View>
        {review.hasReviewed && review.reviewDate && (
          <Text style={styles.reviewDate}>{formatDate(review.reviewDate)}</Text>
        )}
      </View>

      <View style={styles.cardContent}>
        {review.serviceImage && (
          <Image
            source={{ uri: review.serviceImage }}
            style={styles.serviceImage}
            defaultSource={require("../../../assets/default-thumbnail.png")}
          />
        )}
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName} numberOfLines={2}>
            {review.serviceName}
          </Text>
          {review.serviceLocation && (
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={14} color="#7D848D" />
              <Text style={styles.locationText} numberOfLines={1}>
                {review.serviceLocation}
              </Text>
            </View>
          )}
        </View>
      </View>

      {review.hasReviewed ? (
        <View style={styles.reviewSection}>
          <View style={styles.ratingRow}>{renderStars(review.rating || 0)}</View>
          {review.comment && (
            <Text style={styles.commentText} numberOfLines={3}>
              {review.comment}
            </Text>
          )}
          <TouchableOpacity style={styles.editButton} onPress={() => onReviewPress(review)}>
            <Feather name="edit-2" size={16} color="#0F93C3" />
            <Text style={styles.editButtonText}>Chỉnh sửa đánh giá</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cardFooter}>
          <TouchableOpacity style={styles.reviewButton} onPress={() => onReviewPress(review)}>
            <Feather name="star" size={16} color="#fff" />
            <Text style={styles.reviewButtonText}>Đánh giá dịch vụ</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
