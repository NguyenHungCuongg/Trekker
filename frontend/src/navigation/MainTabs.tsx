import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/home/Home";
import Search from "../screens/search/Search";
import Profile from "../screens/profile/Profile";
import BottomNav from "../components/home/BottomNav";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Accommodation from "../screens/accommodation/Accommodation";
import Tour from "../screens/tour/Tour";

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
      <Tab.Screen name="TourTab" component={Tour} />
      <Tab.Screen name="SearchTab" component={Search} />
      <Tab.Screen name="AccommodationTab" component={Accommodation} />
      <Tab.Screen name="ProfileTab" component={Profile} />
    </Tab.Navigator>
  );
}
