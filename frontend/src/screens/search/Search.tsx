import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./searchStyles";
import TourListView from "../../components/TourListView";
import TourCardView from "../../components/TourCardView";
import AccommodationCardView from "../../components/AccommodationCardView";
import FilterBadge from "../../components/search/FilterBadge";
import FilterSection from "../../components/search/FilterSection";
import SearchBar from "../../components/search/SearchBar";
import axiosInstance from "../../utils/axiosInstance";
import { useToast } from "../../components/context/ToastContext";

type Filter = {
  id: string;
  type: "location" | "destination" | "serviceType" | "rating" | "price";
  label: string;
};

type Location = {
  id: number;
  name: string;
};

type Destination = {
  id: number;
  name: string;
  locationId: number;
};

type Tour = {
  id: number;
  tourName: string;
  location: { id: number; name: string };
  rating: number;
  price: number;
  image: string;
};

type Accommodation = {
  id: number;
  name: string;
  destination: { id: number; name: string };
  rating: number;
  pricePerNight: string;
  image: string;
};

type FilterValues = {
  locationId: string;
  destinationId: string;
  serviceType: "all" | "tour" | "accommodation";
  minRating: number;
  priceRange: { min: number; max: number };
};

export default function Search() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { showToast } = useToast();
  const [filterVisible, setFilterVisible] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  // State cho search results
  const [tours, setTours] = useState<Tour[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  // State để lưu các filter đã chọn
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [currentFilterValues, setCurrentFilterValues] = useState<FilterValues>({
    locationId: "",
    destinationId: "",
    serviceType: "all",
    minRating: 0,
    priceRange: { min: 0, max: 999999999 },
  });

  // Initialize with route params if provided
  useEffect(() => {
    const params = route.params;
    if (!params) return;

    // Check if we have any initial params to process
    const hasInitialParams = params.initialServiceType || params.initialLocationId || params.initialDestinationId;

    if (!hasInitialParams) return;

    const newFilters: Filter[] = [];
    const newFilterValues: FilterValues = {
      locationId: "",
      destinationId: "",
      serviceType: "all",
      minRating: 0,
      priceRange: { min: 0, max: 999999999 },
    };

    // Handle service type filter
    if (params.initialServiceType) {
      const serviceType = params.initialServiceType as "tour" | "accommodation";
      newFilterValues.serviceType = serviceType;

      const serviceLabel = serviceType === "tour" ? "Tour du lịch" : "Chỗ ở";
      newFilters.push({
        id: `service-${serviceType}`,
        type: "serviceType",
        label: serviceLabel,
      });
    }

    // Handle location filter
    if (params.initialLocationId && params.initialLocationName) {
      newFilterValues.locationId = params.initialLocationId.toString();
      newFilters.push({
        id: `location-${params.initialLocationId}`,
        type: "location",
        label: params.initialLocationName,
      });

      // Fetch destinations for this location
      fetchDestination(params.initialLocationId);
    }

    // Handle destination filter
    if (params.initialDestinationId && params.initialDestinationName) {
      newFilterValues.destinationId = params.initialDestinationId.toString();
      newFilters.push({
        id: `destination-${params.initialDestinationId}`,
        type: "destination",
        label: params.initialDestinationName,
      });
    }

    setCurrentFilterValues(newFilterValues);
    setActiveFilters(newFilters);

    // Clear route params after processing to allow renavigation
    // Use setTimeout to avoid infinite loop
    setTimeout(() => {
      navigation.setParams({
        initialServiceType: undefined,
        initialLocationId: undefined,
        initialLocationName: undefined,
        initialDestinationId: undefined,
        initialDestinationName: undefined,
      });
    }, 0);
  }, [route.params?.initialServiceType, route.params?.initialLocationId, route.params?.initialDestinationId]);

  useEffect(() => {
    fetchLocations();
  }, []);

  // Debounce search query
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim() || activeFilters.length > 0) {
        performSearch();
      } else {
        setTours([]);
        setAccommodations([]);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, activeFilters]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/locations");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      showToast("error", "Không thể tải danh sách tỉnh/thành");
    } finally {
      setLoading(false);
    }
  };

  const fetchDestination = async (locationId: number) => {
    try {
      const response = await axiosInstance.get(`/destinations?locationId=${locationId}`);
      setDestinations(response.data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      showToast("error", "Không thể tải danh sách địa điểm");
    }
  };

  const handleLocationChange = (locationId: number | null) => {
    if (locationId) {
      fetchDestination(locationId);
    } else {
      setDestinations([]);
    }
  };

  const performSearch = async () => {
    try {
      setSearching(true);
      const { serviceType, locationId, destinationId, minRating, priceRange } = currentFilterValues;

      const tourParams: any = {};
      const accommodationParams: any = {};

      if (locationId) {
        tourParams.locationId = locationId;
        accommodationParams.locationId = locationId;
      }
      if (destinationId) {
        tourParams.destinationId = destinationId;
        accommodationParams.destinationId = destinationId;
      }
      if (minRating > 0) {
        tourParams.minRating = minRating;
        accommodationParams.minRating = minRating;
      }
      if (priceRange.min > 0) {
        tourParams.minPrice = priceRange.min;
        accommodationParams.minPrice = priceRange.min;
      }
      if (priceRange.max < 999999999) {
        tourParams.maxPrice = priceRange.max;
        accommodationParams.maxPrice = priceRange.max;
      }
      if (searchQuery.trim()) {
        tourParams.name = searchQuery.trim();
        accommodationParams.name = searchQuery.trim();
      }

      // Fetch tours và/ hoặc accommodations theo serviceType
      if (serviceType === "all" || serviceType === "tour") {
        const tourResponse = await axiosInstance.get("/tours/search", { params: tourParams });
        setTours(tourResponse.data);
      } else {
        setTours([]);
      }

      if (serviceType === "all" || serviceType === "accommodation") {
        const accommodationResponse = await axiosInstance.get("/accommodations/search", {
          params: accommodationParams,
        });
        setAccommodations(accommodationResponse.data);
      } else {
        setAccommodations([]);
      }
    } catch (error) {
      console.error("Error searching:", error);
      showToast("error", "Tìm kiếm thất bại");
    } finally {
      setSearching(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOpenFilter = () => {
    setFilterVisible(true);
  };

  const handleRemoveFilter = (filterId: string) => {
    const filterToRemove = activeFilters.find((f) => f.id === filterId);
    if (!filterToRemove) return;

    // Update currentFilterValues based on filter type
    setCurrentFilterValues((prev) => {
      const newValues = { ...prev };

      if (filterToRemove.type === "location") {
        newValues.locationId = "";
        newValues.destinationId = ""; // Clear destination too
        setDestinations([]);
      } else if (filterToRemove.type === "destination") {
        newValues.destinationId = "";
      } else if (filterToRemove.type === "serviceType") {
        newValues.serviceType = "all";
      } else if (filterToRemove.type === "rating") {
        newValues.minRating = 0;
      } else if (filterToRemove.type === "price") {
        newValues.priceRange = { min: 0, max: 999999999 };
      }

      return newValues;
    });

    setActiveFilters((prev) => prev.filter((filter) => filter.id !== filterId));
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    setCurrentFilterValues({
      locationId: "",
      destinationId: "",
      serviceType: "all",
      minRating: 0,
      priceRange: { min: 0, max: 999999999 },
    });
    setDestinations([]);
  };

  const handleApplyFilters = (filterValues: FilterValues) => {
    const newFilters: Filter[] = [];

    // Lưu lại filter
    setCurrentFilterValues(filterValues);

    // Thêm location filter
    if (filterValues.locationId) {
      const location = locations.find((loc) => loc.id.toString() === filterValues.locationId);
      if (location) {
        newFilters.push({
          id: `location-${filterValues.locationId}`,
          type: "location",
          label: location.name,
        });
      }
    }

    // Thêm chỗ ở filter
    if (filterValues.destinationId) {
      const destination = destinations.find((dest) => dest.id.toString() === filterValues.destinationId);
      if (destination) {
        newFilters.push({
          id: `destination-${filterValues.destinationId}`,
          type: "destination",
          label: destination.name,
        });
      }
    }

    // Thêm loại service filter
    if (filterValues.serviceType !== "all") {
      const serviceLabel = filterValues.serviceType === "tour" ? "Tour du lịch" : "Chỗ ở";
      newFilters.push({
        id: `service-${filterValues.serviceType}`,
        type: "serviceType",
        label: serviceLabel,
      });
    }

    // Thêm rating filter
    if (filterValues.minRating > 0) {
      newFilters.push({
        id: `rating-${filterValues.minRating}`,
        type: "rating",
        label: `${filterValues.minRating}+ sao`,
      });
    }

    // Thêm giá filter
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backCircle} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#1B1E28" />
        </TouchableOpacity>
        <Text style={styles.title}>Tìm kiếm</Text>
        <View style={{ width: 40 }} />
      </View>

      <SearchBar
        placeholder="Tìm kiếm dịch vụ du lịch"
        onFilterPress={handleOpenFilter}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

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

      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {searching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0F93C3" />
            <Text style={styles.loadingText}>Đang tìm kiếm...</Text>
          </View>
        ) : (
          <>
            {tours.length === 0 && accommodations.length === 0 && (searchQuery || activeFilters.length > 0) ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không tìm thấy kết quả nào</Text>
                <Text style={styles.emptySubtext}>Thử thay đổi từ khóa hoặc bộ lọc</Text>
              </View>
            ) : (
              <>
                {tours.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tour du lịch ({tours.length})</Text>
                    <View style={styles.cardGrid}>
                      {tours.map((tour) => (
                        <TourCardView
                          key={tour.id}
                          tourName={tour.name}
                          location={tour.location?.name || "Unknown"}
                          rating={tour.rating}
                          price={tour.price}
                          image={tour.image}
                          onPress={() => navigation.navigate("TourDetail", { id: tour.id })}
                        />
                      ))}
                    </View>
                  </View>
                )}

                {accommodations.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Chỗ ở ({accommodations.length})</Text>
                    <View style={styles.cardGrid}>
                      {accommodations.map((accommodation) => (
                        <AccommodationCardView
                          key={accommodation.id}
                          name={accommodation.name}
                          destination={accommodation.destination?.name || "Unknown"}
                          rating={accommodation.rating}
                          pricePerNight={accommodation.pricePerNight}
                          image={accommodation.image}
                          onPress={() => navigation.navigate("AccommodationDetail", { id: accommodation.id })}
                        />
                      ))}
                    </View>
                  </View>
                )}
              </>
            )}
          </>
        )}
      </ScrollView>

      {/* Filter Bottom Sheet */}
      <FilterSection
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={handleApplyFilters}
        locations={locations}
        destinations={destinations}
        onLocationChange={handleLocationChange}
      />
    </SafeAreaView>
  );
}
