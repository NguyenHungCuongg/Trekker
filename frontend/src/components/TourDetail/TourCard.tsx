import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

interface TourCardProps {
  title: string;
  location: string;
  rating: number;
  price: string;
  image: string;
}

export default function TourCard({
  title,
  location,
  rating,
  price,
  image,
}: TourCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.rating}>
            <Svg width={13} height={12} viewBox="0 0 13 12" fill="none">
              <Path
                d="M5.59149 0.345492C5.74042 -0.115164 6.38888 -0.115164 6.53781 0.345491L7.62841 3.71885C7.69501 3.92486 7.88603 4.06434 8.10157 4.06434H11.6308C12.1128 4.06434 12.3132 4.68415 11.9233 4.96885L9.06803 7.0537C8.89366 7.18102 8.82069 7.4067 8.8873 7.61271L9.9779 10.9861C10.1268 11.4467 9.60222 11.8298 9.21232 11.5451L6.35708 9.46024C6.18271 9.33291 5.94659 9.33291 5.77222 9.46024L2.91698 11.5451C2.52708 11.8298 2.00247 11.4467 2.1514 10.9861L3.242 7.61271C3.30861 7.4067 3.23564 7.18102 3.06127 7.0537L0.206033 4.96885C-0.183869 4.68415 0.0165137 4.06434 0.49846 4.06434H4.02773C4.24326 4.06434 4.43428 3.92486 4.50089 3.71885L5.59149 0.345492Z"
                fill="#FFD336"
              />
            </Svg>
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.location}>
            <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <Circle
                cx="8"
                cy="7.33333"
                r="2"
                stroke="#7D848D"
                strokeWidth="1.5"
              />
              <Path
                d="M14 7.25926C14 10.5321 10.25 14.6667 8 14.6667C5.75 14.6667 2 10.5321 2 7.25926C2 3.98646 4.68629 1.33333 8 1.33333C11.3137 1.33333 14 3.98646 14 7.25926Z"
                stroke="#7D848D"
                strokeWidth="1.5"
              />
            </Svg>
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 268,
    height: 384,
    borderRadius: 24,
    backgroundColor: "#fff",
    shadowColor: "#B4BCC9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    padding: 14,
    margin: 8,
  },
  image: {
    width: "100%",
    height: 286,
    borderRadius: 20,
    resizeMode: "cover",
  },
  content: {
    paddingTop: 14,
    paddingHorizontal: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: "#1B1E28",
    fontSize: 18,
    fontWeight: "400",
    letterSpacing: 0.5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: "#1B1E28",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    color: "#7D848D",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  price: {
    color: "#15C4C8",
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
