import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./src/screens/Start";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import ForgotPassword from "./src/screens/ForgotPassword";
import Verification from "./src/screens/Verification";
import Home from "./src/screens/Home";
import { ToastProvider } from "./components/context/ToastContext";

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Verification: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Start">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Verification" component={Verification} />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
    
  );
}
