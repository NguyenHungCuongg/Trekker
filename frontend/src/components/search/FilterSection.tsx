import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type FilterSectionProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
};

type FilterValues = {
  locationId: string;
  destinationId: string;
  serviceType: "all" | "tour" | "accommodation";
  minRating: number;
  priceRange: { min: number; max: number };
};

// Dummy data
const LOCATIONS = [
  { id: "1", name: "Hồ Chí Minh" },
  { id: "2", name: "Hà Nội" },
  { id: "3", name: "Đà Nẵng" },
  { id: "4", name: "Nha Trang" },
  { id: "5", name: "Đà Lạt" },
];

const DESTINATIONS_MAP: Record<string, { id: string; name: string }[]> = {
  "1": [
    { id: "1-1", name: "Bến Thành" },
    { id: "1-2", name: "Nhà thờ Đức Bà" },
    { id: "1-3", name: "Phố đi bộ Nguyễn Huệ" },
  ],
  "2": [
    { id: "2-1", name: "Hồ Hoàn Kiếm" },
    { id: "2-2", name: "Văn Miếu" },
    { id: "2-3", name: "Phố Cổ" },
  ],
  "3": [
    { id: "3-1", name: "Bãi biển Mỹ Khê" },
    { id: "3-2", name: "Cầu Rồng" },
    { id: "3-3", name: "Bà Nà Hills" },
  ],
  "4": [
    { id: "4-1", name: "Vinpearl Land" },
    { id: "4-2", name: "Đảo Hòn Mun" },
  ],
  "5": [
    { id: "5-1", name: "Hồ Xuân Hương" },
    { id: "5-2", name: "Thác Datanla" },
  ],
};

const PRICE_RANGES = [
  { label: "Tất cả", min: 0, max: 999999999 },
  { label: "Dưới 500K", min: 0, max: 500000 },
  { label: "500K - 1M", min: 500000, max: 1000000 },
  { label: "1M - 3M", min: 1000000, max: 3000000 },
  { label: "3M - 5M", min: 3000000, max: 5000000 },
  { label: "Trên 5M", min: 5000000, max: 999999999 },
];

const FilterSection: React.FC<FilterSectionProps> = ({ visible, onClose, onApply }) => {
  const [slideAnim] = useState(new Animated.Value(SCREEN_HEIGHT));
  const [filters, setFilters] = useState<FilterValues>({
    locationId: "",
    destinationId: "",
    serviceType: "all",
    minRating: 0,
    priceRange: { min: 0, max: 999999999 },
  });
  const [destinations, setDestinations] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // Update destinations when location changes
  useEffect(() => {
    if (filters.locationId) {
      setDestinations(DESTINATIONS_MAP[filters.locationId] || []);
      setFilters((prev) => ({ ...prev, destinationId: "" }));
    } else {
      setDestinations([]);
    }
  }, [filters.locationId]);

  const handleReset = () => {
    setFilters({
      locationId: "",
      destinationId: "",
      serviceType: "all",
      minRating: 0,
      priceRange: { min: 0, max: 999999999 },
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={28} color="#1B1E28" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bộ lọc</Text>
                <TouchableOpacity onPress={handleReset}>
                  <Text style={styles.resetText}>Đặt lại</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Section 1: Location & Destination */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Địa điểm</Text>

                  {/* Location Picker */}
                  <View style={styles.pickerWrapper}>
                    <Text style={styles.label}>Tỉnh/Thành phố</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={filters.locationId}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, locationId: value }))}
                        style={styles.picker}
                      >
                        <Picker.Item label="Chọn tỉnh/thành phố" value="" />
                        {LOCATIONS.map((loc) => (
                          <Picker.Item key={loc.id} label={loc.name} value={loc.id} />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  {/* Destination Picker */}
                  <View style={styles.pickerWrapper}>
                    <Text style={styles.label}>Điểm đến (Tùy chọn)</Text>
                    <View style={[styles.pickerContainer, !filters.locationId && styles.pickerDisabled]}>
                      <Picker
                        enabled={!!filters.locationId}
                        selectedValue={filters.destinationId}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, destinationId: value }))}
                        style={styles.picker}
                      >
                        <Picker.Item label="Chọn điểm đến" value="" />
                        {destinations.map((dest) => (
                          <Picker.Item key={dest.id} label={dest.name} value={dest.id} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>

                {/* Section 2: Service Type */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Loại dịch vụ</Text>
                  <View style={styles.serviceTypeContainer}>
                    <ServiceTypeButton
                      label="Tất cả"
                      icon={<Ionicons name="apps-outline" size={20} />}
                      active={filters.serviceType === "all"}
                      onPress={() => setFilters((prev) => ({ ...prev, serviceType: "all" }))}
                    />
                    <ServiceTypeButton
                      label="Tour"
                      icon={<Ionicons name="map-outline" size={20} />}
                      active={filters.serviceType === "tour"}
                      onPress={() => setFilters((prev) => ({ ...prev, serviceType: "tour" }))}
                    />
                    <ServiceTypeButton
                      label="Chỗ ở"
                      icon={<MaterialCommunityIcons name="office-building-outline" size={20} />}
                      active={filters.serviceType === "accommodation"}
                      onPress={() => setFilters((prev) => ({ ...prev, serviceType: "accommodation" }))}
                    />
                  </View>
                </View>

                {/* Section 3: Rating & Price */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Đánh giá</Text>
                  <View style={styles.ratingContainer}>
                    {[0, 3, 4, 4.5].map((rating) => (
                      <TouchableOpacity
                        key={rating}
                        style={[styles.ratingButton, filters.minRating === rating && styles.ratingButtonActive]}
                        onPress={() => setFilters((prev) => ({ ...prev, minRating: rating }))}
                      >
                        <Ionicons name="star" size={16} color={filters.minRating === rating ? "#FFB800" : "#7D848D"} />
                        <Text style={[styles.ratingText, filters.minRating === rating && styles.ratingTextActive]}>
                          {rating === 0 ? "Tất cả" : `${rating}+`}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Khoảng giá</Text>
                  <View style={styles.priceContainer}>
                    {PRICE_RANGES.map((range, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.priceButton,
                          filters.priceRange.min === range.min &&
                            filters.priceRange.max === range.max &&
                            styles.priceButtonActive,
                        ]}
                        onPress={() =>
                          setFilters((prev) => ({ ...prev, priceRange: { min: range.min, max: range.max } }))
                        }
                      >
                        <Text
                          style={[
                            styles.priceText,
                            filters.priceRange.min === range.min &&
                              filters.priceRange.max === range.max &&
                              styles.priceTextActive,
                          ]}
                        >
                          {range.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>

              {/* Footer */}
              <View style={styles.footer}>
                <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                  <Text style={styles.applyButtonText}>Áp dụng</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Service Type Button Component
const ServiceTypeButton: React.FC<{
  label: string;
  icon: React.ReactElement;
  active: boolean;
  onPress: () => void;
}> = ({ label, icon, active, onPress }) => (
  <TouchableOpacity style={[styles.serviceTypeButton, active && styles.serviceTypeButtonActive]} onPress={onPress}>
    <View style={styles.serviceTypeIcon}>
      {React.cloneElement(icon, { color: active ? "#0F93C3" : "#7D848D" } as any)}
    </View>
    <Text style={[styles.serviceTypeText, active && styles.serviceTypeTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.85,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F2",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B1E28",
  },
  resetText: {
    fontSize: 16,
    color: "#0F93C3",
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B1E28",
    marginBottom: 12,
  },
  pickerWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#7D848D",
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: "#F7F7F9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8ECF0",
    overflow: "hidden",
  },
  pickerDisabled: {
    opacity: 0.5,
  },
  picker: {
    height: 50,
  },
  serviceTypeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  serviceTypeButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F7F7F9",
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  serviceTypeButtonActive: {
    backgroundColor: "#E6F7F8",
    borderColor: "#0F93C3",
  },
  serviceTypeIcon: {
    marginBottom: 4,
  },
  serviceTypeText: {
    fontSize: 13,
    color: "#7D848D",
    fontWeight: "500",
  },
  serviceTypeTextActive: {
    color: "#0F93C3",
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  ratingButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F9",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 6,
    borderWidth: 2,
    borderColor: "transparent",
  },
  ratingButtonActive: {
    backgroundColor: "#FFF8E1",
    borderColor: "#FFB800",
  },
  ratingText: {
    fontSize: 14,
    color: "#7D848D",
    fontWeight: "500",
  },
  ratingTextActive: {
    color: "#FFB800",
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  priceButton: {
    backgroundColor: "#F7F7F9",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  priceButtonActive: {
    backgroundColor: "#E6F7F8",
    borderColor: "#0F93C3",
  },
  priceText: {
    fontSize: 14,
    color: "#7D848D",
    fontWeight: "500",
  },
  priceTextActive: {
    color: "#0F93C3",
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F2",
  },
  applyButton: {
    backgroundColor: "#0F93C3",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
});

export default FilterSection;
