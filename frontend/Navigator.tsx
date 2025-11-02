import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./src/screens/start/Start";
import Login from "./src/screens/login/Login";
import Register from "./src/screens/register/Register";
import Verification from "./src/screens/verification/Verification";
import ForgotPassword from "./src/screens/forgot-password/ForgotPassword";
import Home from "./src/screens/home/Home";

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Verification: { email: string }; // ← Thêm params cho Verification
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false, // ẩn thanh header cho giao diện full screen
        }}
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
