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
          <Text style={styles.title}>{accommodationName}</Text>

          <View style={styles.locationRow}>
            <Svg width={14} height={14} viewBox="0 0 14 14">
              <Circle
                cx="7"
                cy="6.416"
                r="1.75"
                stroke="#7D848D"
                strokeWidth={1.1}
              />
              <Path
                d="M12.25 6.35186C12.25 9.21556 8.96875 12.8333 7 12.8333C5.03125 12.8333 1.75 9.21556 1.75 6.35186C1.75 3.48816 4.1005 1.16667 7 1.16667C9.8995 1.16667 12.25 3.48816 12.25 6.35186Z"
                stroke="#7D848D"
                strokeWidth={1.1}
              />
            </Svg>
            <Text style={styles.location}>{location}</Text>
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
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  location: {
    color: "#7D848D",
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
