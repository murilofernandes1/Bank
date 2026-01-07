import { View, ScrollView, Text, Animated } from "react-native";
import BackButton from "../../../../../../components/BackButton";
import { styles } from "./styles";
import { useRoute, RouteProp } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { RootStackParamList } from "../../../../../../navigation/PrivateNavigator";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "hooks/useAuth";

export default function QR() {
  const { user } = useAuth();
  const route = useRoute<RouteProp<RootStackParamList, "QR">>();
  const { amount: initialAmount } = route.params;

  const [time, setTime] = useState(10);
  const [active, setActive] = useState(true);
  const [qrData, setQrData] = useState({
    amount: String(initialAmount),
    destinationId: user.id,
    name: user.name,
  });

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time <= 0 && active) {
      setActive(false);

      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setQrData({ amount: "", destinationId: "", name: "" });
    }
  }, [time]);

  return (
    <View style={styles.screen}>
      <BackButton />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.qrBox, { opacity: fadeAnim }]}>
          <QRCode value={JSON.stringify(qrData)} size={280} />
        </Animated.View>

        <Text style={styles.amount}>
          {qrData.amount
            ? Number(qrData.amount).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "--"}
        </Text>

        <Text style={styles.receiver}>
          {qrData.name
            ? `Enviando para ${qrData.name}`
            : "QR Code expirado. Gere um novo na tela anterior."}
        </Text>

        {active ? (
          <Text style={styles.counter}>
            Expira em <Text style={styles.timer}>{time}s</Text>
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}
