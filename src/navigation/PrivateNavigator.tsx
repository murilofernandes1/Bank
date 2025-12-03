import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Pix from "../screens/Pix";
import SendPix from "../screens/Pix/subscreens/SendPix/Send";
import ConfirmPix from "../screens/Pix/subscreens/SendPix/Confirm";
import PixValue from "../screens/Pix/subscreens/SendPix/Value/index";
import ReceiveValue from "../screens/Pix/subscreens/Receive/Value";
import QR from "../screens/Pix/subscreens/Receive/QR";
import PixKey from "../screens/Pix/subscreens/Keys/index";
import ChoosedKey from "../screens/Pix/subscreens/Keys/ChoosedKey";
import PayPix from "../screens/Pay";
const Stack = createStackNavigator();
export type RootStackParamList = {
  QR: {
    value: string;
  };
};

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
      <Stack.Screen name="ReceiveValue" component={ReceiveValue} />
      <Stack.Screen name="QR" component={QR} />
      <Stack.Screen name="Keys" component={PixKey} />
      <Stack.Screen name="ChoosedKey" component={ChoosedKey} />
      {/* PAY SCREENS */}
      <Stack.Screen name="PayPix" component={PayPix} />
    </Stack.Navigator>
  );
}
