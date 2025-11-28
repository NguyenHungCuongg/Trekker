import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./searchStyles";
import TourListView from "../../components/TourListView";
import FilterBadge from "../../components/search/FilterBadge";
import FilterSection from "../../components/search/FilterSection";

type Filter = {
  id: string;
  type: "location" | "destination" | "serviceType" | "rating" | "price";
  label: string;
};

export default function Search() {
  const navigation = useNavigation<any>();
  const [filterVisible, setFilterVisible] = useState(false);

  // State để lưu các filter đã chọn
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOpenFilter = () => {
    setFilterVisible(true);
  };

  const handleRemoveFilter = (filterId: string) => {
    setActiveFilters((prev) => prev.filter((filter) => filter.id !== filterId));
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
  };

  const handleApplyFilters = (filterValues: any) => {
    const newFilters: Filter[] = [];

    // Add location filter
    if (filterValues.locationId) {
      const location = LOCATIONS.find((loc) => loc.id === filterValues.locationId);
      if (location) {
        newFilters.push({
          id: `location-${filterValues.locationId}`,
          type: "location",
          label: location.name,
        });
      }
    }

    // Add destination filter
    if (filterValues.destinationId) {
      const allDestinations = Object.values(DESTINATIONS_MAP).flat();
      const destination = allDestinations.find((dest) => dest.id === filterValues.destinationId);
      if (destination) {
        newFilters.push({
          id: `destination-${filterValues.destinationId}`,
          type: "destination",
          label: destination.name,
        });
      }
    }

    // Add service type filter
    if (filterValues.serviceType !== "all") {
      const serviceLabel = filterValues.serviceType === "tour" ? "Tour du lịch" : "Chỗ ở";
      newFilters.push({
        id: `service-${filterValues.serviceType}`,
        type: "serviceType",
        label: serviceLabel,
      });
    }

    // Add rating filter
    if (filterValues.minRating > 0) {
      newFilters.push({
        id: `rating-${filterValues.minRating}`,
        type: "rating",
        label: `${filterValues.minRating}+ sao`,
      });
    }

    // Add price filter
    if (filterValues.priceRange.min > 0 || filterValues.priceRange.max < 999999999) {
      const priceLabel = getPriceLabel(filterValues.priceRange);
      newFilters.push({
        id: `price-${filterValues.priceRange.min}-${filterValues.priceRange.max}`,
        type: "price",
        label: priceLabel,
      });
    }

    setActiveFilters(newFilters);
  };

  const getPriceLabel = (range: { min: number; max: number }) => {
    if (range.max === 999999999) return range.min === 0 ? "Tất cả" : "Trên 5M";
    if (range.max === 500000) return "Dưới 500K";
    if (range.min === 500000 && range.max === 1000000) return "500K - 1M";
    if (range.min === 1000000 && range.max === 3000000) return "1M - 3M";
    if (range.min === 3000000 && range.max === 5000000) return "3M - 5M";
    return "Tùy chỉnh";
  };

  // Dummy data (same as FilterSection)
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

  const searchIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="10.9413" cy="11.9414" r="7.94134" stroke="#7D848D" stroke-width="1.6"/>
      <path d="M20.0003 21.0001L17.0009 18.0006" stroke="#7D848D" stroke-width="1.6"/>
    </svg>
  `;

  const filterIcon = `
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
      <path d="M20.05 0.7H2.35C1.44 0.7 0.7 1.44 0.7 2.35C0.7 2.79 0.87 3.21 1.18 3.52L7.11 9.45C7.49 9.82 7.7 10.33 7.7 10.86V16.96C7.7 17.72 8.13 18.41 8.81 18.75L13.98 21.34C14.31 21.5 14.7 21.26 14.7 20.89V10.86C14.7 10.33 14.91 9.82 15.29 9.45L21.22 3.52C21.53 3.21 21.7 2.79 21.7 2.35C21.7 1.44 20.96 0.7 20.05 0.7Z" stroke="#7D848D" stroke-width="1.4"/>
    </svg>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backCircle} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#1B1E28" />
        </TouchableOpacity>
        <Text style={styles.title}>Tìm kiếm</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchBar}>
        <SvgXml xml={searchIcon} width={24} height={24} />
        <TextInput style={styles.searchInput} placeholder="Tìm kiếm dịch vụ du lịch" placeholderTextColor="#7D848D" />
        <TouchableOpacity onPress={handleOpenFilter}>
          <SvgXml xml={filterIcon} width={24} height={24} />
        </TouchableOpacity>
      </View>

      {activeFilters.length > 0 && (
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterBadges}>
            {activeFilters.map((filter) => (
              <FilterBadge key={filter.id} label={filter.label} onRemove={() => handleRemoveFilter(filter.id)} />
            ))}
          </ScrollView>
          {activeFilters.length > 1 && (
            <TouchableOpacity onPress={handleClearAllFilters} style={styles.clearAllButton}>
              <Text style={styles.clearAllText}>Xóa tất cả</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Text style={styles.resultsTitle}>Kết quả tìm kiếm</Text>

      <ScrollView contentContainerStyle={styles.results}>
        <TourListView
          tourName="Tên tour"
          location="Tên location"
          rating={4.8}
          price="Giá"
          imageUrl="https://api.builder.io/api/v1/image/assets/TEMP/c0ccc56e65e45b05b9dc85d49b3b6c63e7d69013?width=190"
        />
      </ScrollView>

      {/* Filter Bottom Sheet */}
      <FilterSection visible={filterVisible} onClose={() => setFilterVisible(false)} onApply={handleApplyFilters} />
    </View>
  );
}
