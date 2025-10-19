import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./src/screens/Start";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import ForgotPassword from "./src/screens/ForgotPassword";
import Verification from "./src/screens/Verification";
import Home from "./src/screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Verification" component={Verification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
