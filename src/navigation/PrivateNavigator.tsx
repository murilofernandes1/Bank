import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Pix from "../screens/Pix";
import SendPix from "../screens/Pix/subscreens/SendPix/Send";
import ConfirmPix from "../screens/Pix/subscreens/SendPix/Confirm";
import PixValue from "../screens/Pix/subscreens/SendPix/Value/index";
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
      {/* SEND PIX SUB SCREENS */}
      <Stack.Screen name="SendPix" component={SendPix} />
      <Stack.Screen name="PixValue" component={PixValue} />
      <Stack.Screen name="ConfirmPix" component={ConfirmPix} />
    </Stack.Navigator>
  );
}
