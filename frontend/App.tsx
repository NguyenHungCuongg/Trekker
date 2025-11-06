import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Start from "./src/screens/start/Start";
import Register from "./src/screens/register/Register";
import Login from "./src/screens/login/Login";
import ForgotPassword from "./src/screens/forgot-password/ForgotPassword";
import Verification from "./src/screens/verification/Verification";
import ResetPassword from "./src/screens/reset-password/ResetPassword";
import Home from "./src/screens/home/Home";
import { ToastProvider } from "./src/components/context/ToastContext";
import TourDetail from "./src/screens/tour-detail/TourDetail";
import Profile from "./src/screens/profile/Profile";
import ProfileDetail from "./src/screens/profile-detail/ProfileDetail";
import AccommodationDetail from "./src/screens/accommodation-detail/AccommodationDetail";
import Search from "./src/screens/search/Search";

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Verification: { email: string };
  ResetPassword: { email: string };
  Home: undefined;
  TourDetail: undefined;
  Profile: undefined;
  ProfileDetail: undefined;
  AccommodationDetail: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Start"
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="TourDetail" component={TourDetail} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
            <Stack.Screen
              name="AccommodationDetail"
              component={AccommodationDetail}
            />
            <Stack.Screen name="Search" component={Search} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
