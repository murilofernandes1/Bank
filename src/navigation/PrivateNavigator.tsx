import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Pix from "../screens/Pix";
import SendPix from "../screens/Pix/subscreens/Send";
const Stack = createStackNavigator();

export default function PrivateNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "fade_from_right" }}
    >
      {/* HOME SCREENS */}
      <Stack.Screen name="Home" component={Home} />
      {/* PIX SCREENS */}
      <Stack.Screen name="Pix" component={Pix} />
      <Stack.Screen name="SendPix" component={SendPix} />
    </Stack.Navigator>
  );
}
