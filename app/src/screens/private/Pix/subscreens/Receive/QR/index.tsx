import { View, ScrollView, Text } from "react-native";
import BackButton from "../../../../../../components/BackButton";
import { styles } from "./styles";
import { useRoute, RouteProp } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { RootStackParamList } from "../../../../../../navigation/PrivateNavigator";
import { useEffect, useState } from "react";
import { useAuth } from "hooks/useAuth";

export default function QR() {
  const { user } = useAuth();
  const route = useRoute<RouteProp<RootStackParamList, "QR">>();
  const { amount } = route.params;
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

  const transaction = {
    amount: amount,
    destinationId: user.id,
  };

  const qrCodeValue = JSON.stringify(transaction);
  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.qrBox}>
          <QRCode value={qrCodeValue} size={220} />
        </View>

        <Text style={styles.amount}>
          {Number(amount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>

        <Text style={styles.receiver}>Enviando para {user?.name}</Text>
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
