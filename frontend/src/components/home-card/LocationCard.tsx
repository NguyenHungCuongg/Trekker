import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Svg, Path } from "react-native-svg";

interface LocationCardProps {
  name: string;
  accommodations: number;
  tours: number;
  image: string;
  onPress?: () => void;
}

export default function LocationCard({ name, accommodations, tours, image, onPress }: LocationCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>

        <View style={styles.stats}>
          {/* Accommodation Stat */}
          <View style={styles.stat}>
            <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
              <Path
                d="M6 10.0618C3.77742 10.5527 2.25 11.5721 2.25 12.75C2.25 14.4069 5.27208 15.75 9 15.75C12.7279 15.75 15.75 14.4069 15.75 12.75C15.75 11.5721 14.2226 10.5527 12 10.0618M9 12.75V7.45642M9 7.45642V1.75391C9 1.57182 9.18725 1.44905 9.35557 1.52078L15.5954 4.17972C15.8015 4.26756 15.8015 4.55813 15.5954 4.64597L9 7.45642Z"
                stroke="#7D848D"
                strokeWidth={1.4}
                strokeLinecap="round"
              />
            </Svg>
            <Text style={styles.statText}>Số chỗ ở: {accommodations}</Text>
          </View>

          {/* Tour Stat */}
          <View style={styles.stat}>
            <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <Path
                d="M5.36666 4.28715V14.0779M10.0333 1.02358V10.8143M1.9757 1.32287L4.37082 3.41662C4.94769 3.9209 5.78563 3.9209 6.36251 3.41662L9.03749 1.07822C9.61436 0.573941 10.4523 0.573942 11.0292 1.07823L14.1403 3.79787C14.4949 4.1079 14.7 4.56716 14.7 5.05144V13.1518C14.7 13.8435 13.9309 14.2214 13.4243 13.7786L11.0292 11.6848C10.4523 11.1805 9.61436 11.1805 9.03749 11.6848L6.36251 14.0232C5.78563 14.5275 4.94769 14.5275 4.37082 14.0232L1.25971 11.3036C0.905055 10.9935 0.699997 10.5343 0.699997 10.05V1.94966C0.699997 1.25791 1.46911 0.880024 1.9757 1.32287Z"
                stroke="#7D848D"
                strokeWidth={1.4}
                strokeLinecap="round"
              />
            </Svg>
            <Text style={styles.statText}>Số tour du lịch: {tours}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 268,
    height: 413,
    borderRadius: 24,
    backgroundColor: "#fff",
    shadowColor: "#B4BCC9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    paddingVertical: 15,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    marginTop: 8,
    marginBottom: 16,
  },
  image: {
    width: 240,
    height: 286,
    borderRadius: 20,
    resizeMode: "cover",
  },
  content: {
    paddingTop: 14,
    alignItems: "center",
  },
  title: {
    color: "#1B1E28",
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  stats: {
    flexDirection: "column",
    alignItems: "center",
    gap: 9,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    color: "#7D848D",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
});
