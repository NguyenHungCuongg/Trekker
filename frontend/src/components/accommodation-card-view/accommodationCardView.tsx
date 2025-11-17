import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

interface AccommodationCardViewProps {
  accommodationName: string;
  location: string;
  rating: number;
  price: string;
  imageUrl: string;
}

export default function AccommodationCardView({
  accommodationName,
  location,
  rating,
  price,
  imageUrl,
}: AccommodationCardViewProps) {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {accommodationName}
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.locationRow}>
              <Svg width={12} height={12} viewBox="0 0 16 16" fill="none">
                <Circle cx="8" cy="7.33337" r="2" stroke="#7D848D" strokeWidth={1.5} />
                <Path
                  d="M14 7.2593C14 10.5321 10.25 14.6667 8 14.6667C5.75 14.6667 2 10.5321 2 7.2593C2 3.9865 4.68629 1.33337 8 1.33337C11.3137 1.33337 14 3.9865 14 7.2593Z"
                  stroke="#7D848D"
                  strokeWidth={1.5}
                />
              </Svg>
              <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
                {location}
              </Text>
            </View>

            <View style={styles.ratingRow}>
              <Svg width={12} height={11} viewBox="0 0 12 11">
                <Path
                  d="M5.53189 0.326416C5.67923 -0.108805 6.32077 -0.108806 6.46811 0.326415L7.54709 3.51352C7.61299 3.70815 7.80197 3.83993 8.01521 3.83993H11.5069C11.9837 3.83993 12.1819 4.42552 11.7962 4.6945L8.97136 6.66424C8.79885 6.78453 8.72666 6.99775 8.79256 7.19239L9.87154 10.3795C10.0189 10.8147 9.49986 11.1766 9.11411 10.9076L6.28931 8.9379C6.1168 8.81761 5.8832 8.81761 5.71069 8.9379L2.88589 10.9076C2.50014 11.1766 1.98112 10.8147 2.12846 10.3795L3.20744 7.19239C3.27334 6.99775 3.20115 6.78453 3.02864 6.66424L0.203837 4.6945C-0.181909 4.42552 0.0163376 3.83993 0.493147 3.83993H3.98479C4.19803 3.83993 4.38701 3.70815 4.45291 3.51352L5.53189 0.326416Z"
                  fill="#FFD336"
                />
              </Svg>

              <Text style={styles.rating}>{rating}</Text>
            </View>
          </View>

          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 161,
    height: 238,
  },
  container: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#FFF",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: 137,
    height: 124,
    borderRadius: 16,
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 4,
    gap: 6,
  },
  title: {
    color: "#1B1E28",
    fontSize: 14,
    fontWeight: "700",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    flex: 1,
    minWidth: 0,
  },
  location: {
    color: "#7D848D",
    fontSize: 12,
    flex: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexShrink: 0,
  },
  rating: {
    color: "#1B1E28",
    fontSize: 12,
  },
  price: {
    color: "#15C4C8",
    fontSize: 12,
  },
});
