import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Svg, Path, Circle } from "react-native-svg";
import { styles } from "./accommodationStyle"; //
import AccommodationListView from "../../components/search/AccommodationListView";
import TourCardView from "../../components/tour-card-view/TourCardView";
import AccommodationCardView from "../../components/accommodation-card-view/AccommodationCardView";

export default function Accommodation() {
  const navigation = useNavigation();
  const [isListView, setIsListView] = useState(false);

  const handleBack = () => navigation.goBack();
  const toggleView = () => setIsListView(!isListView);

  // Mock data cho Accommodation
  const mockAccommodations = [
    {
      id: 1,
      accommodationName: "Tên chỗ ở",
      location: "Tên location",
      rating: 4.7,
      price: "Giá",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/e7e3700c212de6ee17d3d9b8cc67ff5f208cf750?width=274",
    },
    {
      id: 2,
      accommodationName: "Tên chỗ ở",
      location: "Tên location",
      rating: 4.7,
      price: "Giá",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/e7e3700c212de6ee17d3d9b8cc67ff5f208cf750?width=274",
    },
    {
      id: 3,
      accommodationName: "Tên chỗ ở",
      location: "Tên location",
      rating: 4.7,
      price: "Giá",
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/e7e3700c212de6ee17d3d9b8cc67ff5f208cf750?width=274",
    },
  ];

  return (
    <View style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Svg width={44} height={44} viewBox="0 0 44 44">
            <Circle cx="22" cy="22" r="22" fill="#F7F7F9" />
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.4685 16.4143C24.7919 16.6731 24.8444 17.145 24.5856 17.4685L20.9604 22L24.5856 26.5314C24.8444 26.8549 24.7919 27.3269 24.4685 27.5856C24.145 27.8444 23.6731 27.7919 23.4143 27.4685L19.4143 22.4685C19.1952 22.1946 19.1952 21.8054 19.4143 21.5314L23.4143 16.5314C23.6731 16.208 24.145 16.1556 24.4685 16.4143Z"
              fill="#1B1E28"
            />
          </Svg>
        </TouchableOpacity>

        <Text style={styles.title}>Chổ ở</Text>
      </View>

      {/* CONTENT */}
      <ScrollView style={styles.content}>
        <View style={styles.controls}>
          <Text style={styles.sectionTitle}>Tất cả các chổ ở</Text>

          <View style={styles.viewControls}>
            {/* GRID/LIST ICON */}
            <TouchableOpacity onPress={toggleView}>
              {isListView ? (
                <Svg width="20" height="20" viewBox="-1 -1 22 22" fill="none">
                  <Path
                    d="M20 6.06365L0 6.06365M20 13.3364L0 13.3364M7.27273 19.7H12.7273C15.2727 19.7 16.5455 19.7 17.5176 19.2046C18.3729 18.7688 19.0688 18.0734 19.5046 17.2182C20 16.2458 20 14.973 20 12.4273V6.97274C20 4.42705 20 3.1542 19.5046 2.18187C19.0688 1.32659 18.3729 0.631227 17.5176 0.195438C16.5455 -0.299988 15.2727 -0.299988 12.7273 -0.299988H7.27273C4.72705 -0.299988 3.4542 -0.299988 2.48187 0.195438C1.62659 0.631227 0.931232 1.32659 0.495443 2.18187C0 3.1542 0 4.42705 0 6.97274V12.4273C0 14.973 0 16.2458 0.495443 17.2182C0.931232 18.0734 1.62659 18.7688 2.48187 19.2046C3.4542 19.7 4.72705 19.7 7.27273 19.7Z"
                    stroke="#15C4C8"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                  />
                </Svg>
              ) : (
                <Svg width="20" height="20" viewBox="-1 -1 22 22" fill="none">
                  <Path
                    d="M10 0.7V20.7M20 10.7L0 10.7M7.27273 20.7H12.7273C15.2727 20.7 16.5455 20.7 17.5176 20.2046C18.3729 19.7688 19.0688 19.0734 19.5046 18.2182C20 17.2458 20 15.973 20 13.4273V7.97274C20 5.42705 20 4.1542 19.5046 3.18187C19.0688 2.32659 18.3729 1.63123 17.5176 1.19544C16.5455 0.700012 15.2727 0.700012 12.7273 0.700012H7.27273C4.72705 0.700012 3.4542 0.700012 2.48187 1.19544C1.62659 1.63123 0.931232 2.32659 0.495443 3.18187C0 4.1542 0 5.42705 0 7.97274V13.4273C0 15.973 0 17.2458 0.495443 18.2182C0.931232 19.0734 1.62659 19.7688 2.48187 20.2046C3.4542 20.7 4.72705 20.7 7.27273 20.7Z"
                    stroke="#15C4C8"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                  />
                </Svg>
              )}
            </TouchableOpacity>

            {/* FILTER ICON */}
            <TouchableOpacity>
              <Svg width="16" height="19" viewBox="0 0 16 19" fill="none">
                <Path
                  d="M11.7 1.2858L11.6999 16.2858M3.69995 17.2858L3.69995 2.2858M8.69995 15.2858L10.9928 17.5787C11.3834 17.9692 12.0165 17.9692 12.4071 17.5787L14.7 15.2858M0.699951 3.2858L2.99284 0.992905C3.38337 0.602381 4.01653 0.602381 4.40706 0.992905L6.69995 3.2858"
                  stroke="#15C4C8"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

        {/* LIST / GRID */}
        <View style={[styles.grid, isListView ? styles.gridList : styles.gridCard]}>
          {mockAccommodations.map((item) =>
            isListView ? (
              <AccommodationListView key={item.id} {...item} />
            ) : (
              <AccommodationCardView key={item.id} {...item} />
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
}
