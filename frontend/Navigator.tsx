import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./src/screens/Start";
import Login from "./src/screens/Login";

export type RootStackParamList = {
  Index: undefined;
  AnotherScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false, // ẩn thanh header cho giao diện full screen
        }}
      >
        <Stack.Screen name="Index" component={Login} />
        {/* <Stack.Screen name="AnotherScreen" component={} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
