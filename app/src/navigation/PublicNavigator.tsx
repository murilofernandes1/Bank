import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/public/Login";
import Register from "../screens/public/Register";
import LandingPage from "../screens/public/LandingPage";

const Stack = createStackNavigator();
export default function PublicNavigator() {
  return (
    <Stack.Navigator
      id="PublicStack"
      screenOptions={{ headerShown: false, animation: "fade_from_right" }}
    >
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
