import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./reviewPopupStyles";

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

interface ReviewPopupProps {
  visible: boolean;
  review: ReviewItem;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export default function ReviewPopup({ visible, review, onClose, onSubmit }: ReviewPopupProps) {
  const [rating, setRating] = useState(review.rating || 0);
  const [comment, setComment] = useState(review.comment || "");

  useEffect(() => {
    if (visible) {
      setRating(review.rating || 0);
      setComment(review.comment || "");
    }
  }, [visible, review]);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá");
      return;
    }
    onSubmit(rating, comment);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
          <Feather name="star" size={32} color={i <= rating ? "#FFB800" : "#E0E0E0"} />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{review.hasReviewed ? "Chỉnh sửa đánh giá" : "Đánh giá dịch vụ"}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#7D848D" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName} numberOfLines={2}>
                {review.serviceName}
              </Text>
              <View style={styles.locationRow}>
                <Feather name="map-pin" size={14} color="#7D848D" />
                <Text style={styles.locationText}>{review.serviceLocation}</Text>
              </View>
            </View>

            <View style={styles.ratingSection}>
              <Text style={styles.sectionLabel}>Đánh giá của bạn</Text>
              <View style={styles.starsContainer}>{renderStars()}</View>
              {rating > 0 && (
                <Text style={styles.ratingText}>
                  {rating === 1
                    ? "Rất tệ"
                    : rating === 2
                    ? "Tệ"
                    : rating === 3
                    ? "Bình thường"
                    : rating === 4
                    ? "Tốt"
                    : "Xuất sắc"}
                </Text>
              )}
            </View>

            <View style={styles.commentSection}>
              <Text style={styles.sectionLabel}>Nhận xét (không bắt buộc)</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ này..."
                placeholderTextColor="#B0B0B0"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={comment}
                onChangeText={setComment}
                maxLength={500}
              />
              <Text style={styles.characterCount}>{comment.length}/500</Text>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{review.hasReviewed ? "Cập nhật" : "Gửi đánh giá"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
