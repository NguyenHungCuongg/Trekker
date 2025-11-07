import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/home/Home";
import Search from "../screens/search/Search";
import Profile from "../screens/profile/Profile";
import BottomNav from "../components/home/BottomNav";

// Placeholder screens cho Tour và Chỗ ở (tạm thời)
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function TourScreen() {
  return (
    <SafeAreaView style={styles.placeholder}>
      <Text style={styles.placeholderText}>Tour Screen</Text>
      <Text style={styles.placeholderSubtext}>Coming soon...</Text>
    </SafeAreaView>
  );
}

function AccommodationScreen() {
  return (
    <SafeAreaView style={styles.placeholder}>
      <Text style={styles.placeholderText}>Chỗ ở Screen</Text>
      <Text style={styles.placeholderSubtext}>Coming soon...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B1E28",
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: "#7D848D",
  },
});

export type MainTabsParamList = {
  HomeTab: undefined;
  TourTab: undefined;
  SearchTab: undefined;
  AccommodationTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={Home} />
      <Tab.Screen name="TourTab" component={TourScreen} />
      <Tab.Screen name="SearchTab" component={Search} />
      <Tab.Screen name="AccommodationTab" component={AccommodationScreen} />
      <Tab.Screen name="ProfileTab" component={Profile} />
    </Tab.Navigator>
  );
}
