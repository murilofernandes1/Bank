import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/private/Home";
import SendPix from "../screens/private/Pix/subscreens/SendPix/Send";
import ConfirmPix from "../screens/private/Pix/subscreens/SendPix/Confirm";
import ReceiveValue from "../screens/private/Pix/subscreens/Receive/Value";
import QR from "../screens/private/Pix/subscreens/Receive/QR";
import Pix from "../screens/private/Pix";
import ChoosedKey from "../screens/private/Pix/subscreens/Keys/ChoosedKey";
import Statement from "../screens/private/Statement";
import PayPix from "../screens/private/Pay";
import PixValue from "../screens/private/Pix/subscreens/SendPix/Value";
import PixKeys from "../screens/private/Pix/subscreens/Keys";
import CreditCard from "../screens/private/CreditCard";
import PayCreditCard from "../screens/private/CreditCard/subscreens/PayCreditCard";
import Investments from "../screens/private/Investments";
import CreateCreditCard from "../screens/private/CreditCard/subscreens/CreateCreditCard";

const Stack = createStackNavigator();
export type RootStackParamList = {
  QR: {
    amount: string;
  };
};

export default function PrivateNavigator() {
  return (
    <Stack.Navigator
      id="PrivateStack"
      screenOptions={{ headerShown: false, animation: "fade_from_right" }}
    >
      {/* HOME SCREENS */}
      <Stack.Screen name="Home" component={Home} />
      {/* WELCOME SCREENS */}

      {/* PIX SCREENS */}
      <Stack.Screen name="Pix" component={Pix} />
      {/* SEND PIX SUB SCREENS */}
      <Stack.Screen name="SendPix" component={SendPix} />
      <Stack.Screen name="PixValue" component={PixValue} />
      <Stack.Screen name="ConfirmPix" component={ConfirmPix} />
      <Stack.Screen name="ReceiveValue" component={ReceiveValue} />
      <Stack.Screen name="QR" component={QR} />
      <Stack.Screen name="PixKeys" component={PixKeys} />
      <Stack.Screen name="ChoosedKey" component={ChoosedKey} />
      {/* PAY SCREENS */}
      <Stack.Screen name="PayPix" component={PayPix} />
      {/* STATEMENT SCREENS */}
      <Stack.Screen name="Statement" component={Statement} />
      {/* CREDIT CARD SCREENS */}
      <Stack.Screen name="CreditCard" component={CreditCard} />
      <Stack.Screen name="PayCreditCard" component={PayCreditCard} />
      <Stack.Screen name="CreateCreditCard" component={CreateCreditCard} />
      {/* INVESTMENTS SCREENS */}
      <Stack.Screen name="Investments" component={Investments} />
    </Stack.Navigator>
  );
}
