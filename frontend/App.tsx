import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./src/screens/Start";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import ForgotPassword from "./src/screens/ForgotPassword";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
