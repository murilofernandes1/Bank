import { View, ScrollView, Text } from "react-native";
import BackButton from "../../../../../components/BackButton";
import { styles } from "./styles";
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { RootStackParamList } from "../../../../../navigation/PrivateNavigator";
import { useEffect, useState } from "react";

type QrTypes = {
  interval: number | null;
};
export default function QR<QrTypes>() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<RootStackParamList, "QR">>();
  const { value } = route.params;
  const [time, setTime] = useState(120);
  const [active, setActive] = useState(true);
  const [expired, setExpired] = useState(false);
  let interval: NodeJS.Timeout;
  useEffect(() => {
    if (active) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!active && time !== 0) {
      setExpired(true);
    } else {
    }
  }, []);

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.qrBox}>
          <QRCode value={value} size={220} />
        </View>

        <Text style={styles.amount}>R$ 150,00</Text>

        <Text style={styles.receiver}>Enviando para Kelverlyson Silva</Text>
        {active && <Text>{time}</Text>}
        {expired && <Text>QrCode expirado.</Text>}
      </ScrollView>
    </View>
  );
}
