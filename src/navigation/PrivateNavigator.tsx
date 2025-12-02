import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Pix from "../screens/Pix";
const Stack = createStackNavigator();

export default function PrivateNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "fade_from_right" }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pix" component={Pix} />
    </Stack.Navigator>
  );
}
