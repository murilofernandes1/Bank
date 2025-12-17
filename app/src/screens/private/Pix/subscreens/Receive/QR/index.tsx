import { View, ScrollView, Text } from "react-native";
import BackButton from "../../../../../../components/BackButton";
import { styles } from "./styles";
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { RootStackParamList } from "../../../../../../navigation/PrivateNavigator";
import { useEffect, useState } from "react";

export default function QR() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<RootStackParamList, "QR">>();
  const { value } = route.params;
  const [time, setTime] = useState(90);
  const [active, setActive] = useState(true);
  const [expired, setExpired] = useState(false);
  let interval: NodeJS.Timeout;
  useEffect(() => {
    interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (time === 0) {
      clearInterval(interval);
      setActive(false);
      setExpired(true);
    }
  });
  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.qrBox}>
          <QRCode value={value} size={220} />
        </View>

        <Text style={styles.amount}>R$ 150,00</Text>

        <Text style={styles.receiver}>Enviando para Kelverlyson Silva</Text>
        {active && (
          <Text style={styles.counter}>
            Seu QRCode expira em {time} segundos.
          </Text>
        )}
        {expired && <Text style={styles.expired}>QRCode expirado.</Text>}
      </ScrollView>
    </View>
  );
}
