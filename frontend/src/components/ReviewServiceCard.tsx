import React from "react";
import { View, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./reviewServiceCardStyles";

interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
    profileImage?: string;
  };
}

interface ReviewServiceCardProps {
  review: Review;
}

export default function ReviewServiceCard({ review }: ReviewServiceCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Feather key={i} name="star" size={14} color={i <= rating ? "#FFB800" : "#E0E0E0"} style={{ marginRight: 2 }} />
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
      <View style={styles.reviewHeader}>
        <Image
          source={
            review.user.profileImage
              ? { uri: review.user.profileImage }
              : require("../../assets/default-profile-image.jpg")
          }
          style={styles.userAvatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{review.user.username}</Text>
          <View style={styles.ratingRow}>
            {renderStars(review.rating)}
            <Text style={styles.reviewDate}> • {formatDate(review.createdAt)}</Text>
          </View>
        </View>
      </View>

      {review.comment && <Text style={styles.reviewComment}>{review.comment}</Text>}
    </View>
  );
}
