import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { formatNumber } from "../utils/formatNumber";

const defaultThumbnail = require("../../assets/default-thumbnail.png");

interface AccommodationListViewProps {
  name: string;
  destination: string;
  rating: number;
  pricePerNight: string;
  image: string;
  onPress?: () => void;
}

const AccommodationListView: React.FC<AccommodationListViewProps> = ({
  name,
  destination,
  rating,
  pricePerNight,
  image,
  onPress,
}) => {
  const starIcon = `
    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.53189 0.326416C5.67923 -0.108805 6.32077 -0.108806 6.46811 0.326415L7.54709 3.51352C7.61299 3.70815 7.80197 3.83993 8.01521 3.83993H11.5069C11.9837 3.83993 12.1819 4.42552 11.7962 4.6945L8.97136 6.66424C8.79885 6.78453 8.72666 6.99775 8.79256 7.19239L9.87154 10.3795C10.0189 10.8147 9.49986 11.1766 9.11411 10.9076L6.28931 8.9379C6.1168 8.81761 5.8832 8.81761 5.71069 8.9379L2.88589 10.9076C2.50014 11.1766 1.98112 10.8147 2.12846 10.3795L3.20744 7.19239C3.27334 6.99775 3.20115 6.78453 3.02864 6.66424L0.203837 4.6945C-0.181909 4.42552 0.0163376 3.83993 0.493147 3.83993H3.98479C4.19803 3.83993 4.38701 3.70815 4.45291 3.51352L5.53189 0.326416Z" fill="#FFD336"/>
    </svg>
  `;

  const locationIcon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="7.33334" r="2" stroke="#7D848D" stroke-width="1.5"/>
      <path d="M14 7.25927C14 10.5321 10.25 14.6667 8 14.6667C5.75 14.6667 2 10.5321 2 7.25927C2 3.98647 4.68629 1.33334 8 1.33334C11.3137 1.33334 14 3.98647 14 7.25927Z" stroke="#7D848D" stroke-width="1.5"/>
    </svg>
  `;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <Image source={image ? { uri: image } : defaultThumbnail} style={styles.image} />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.rating}>
            <SvgXml xml={starIcon} width={12} height={11} />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <SvgXml xml={locationIcon} width={16} height={16} />
          <Text style={styles.locationText}>{destination}</Text>
        </View>

        {/* Price */}
        <Text style={styles.price}>{formatNumber(pricePerNight)}đ</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AccommodationListView;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 335,
    height: 140,
    borderRadius: 16,
    backgroundColor: "#FFF",
    shadowColor: "#313131ff",
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    flexDirection: "row",
    padding: 12,
    gap: 14,
    marginBottom: 16,
  },
  image: {
    width: 95,
    height: 116,
    borderRadius: 16,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    color: "#1B1E28",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    color: "#1B1E28",
    fontSize: 13,
    letterSpacing: 0.3,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationText: {
    color: "#7D848D",
    fontSize: 13,
    letterSpacing: 0.3,
  },
  price: {
    color: "#15C4C8",
    fontSize: 13,
    letterSpacing: 0.3,
    marginTop: 8,
  },
});
