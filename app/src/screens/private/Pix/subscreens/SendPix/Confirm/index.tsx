import { View, Text, ScrollView } from "react-native";
import BackButton from "../../../../../../components/BackButton";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowDownIcon } from "phosphor-react-native";
import GradientButton from "../../../../../../components/GlobalButton";
import LoadingAction from "../../../../../../components/LoadingAction";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTransfer } from "../../../../../../hooks/useTransfer";
import { useRoute, RouteProp } from "@react-navigation/native";
import PinChecker from "components/PinHandler";

type RouteParams = {
  ConfirmPix: {
    methodName: string;
  };
};

export default function ConfirmPix() {
  const { destinationId, amount, destinationName, SendTransfer } =
    useTransfer();

  const route = useRoute<RouteProp<RouteParams, "ConfirmPix">>();
  const { methodName } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [showPin, setShowPin] = useState(false);

  function handleTransfer() {
    setShowPin(true);
  }

  async function confirmTransfer(pin: string) {
    try {
      if (!destinationId || !amount) return;

      setShowPin(false);
      setSending(true);
      setLoading(true);

      await SendTransfer(pin, destinationId, amount);

      setLoading(false);
      setMessage(true);

      setTimeout(() => {
        navigation.replace("Home");
      }, 3000);
    } catch {
      setError(true);
    }
  }

  return (
    <>
      <View style={styles.screen}>
        <BackButton />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Você vai enviar</Text>

          <LinearGradient
            colors={["#0d1b2a", "#1b263b", "#415a77"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.value}>
              {amount && amount > 0
                ? amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  })
                : "R$ 0,00"}
            </Text>

            <Text style={styles.method}>Via {methodName}</Text>

            <ArrowDownIcon style={styles.arrow} size={15} color="#f0f7ff" />

            <Text style={styles.name}>{destinationName}</Text>
            <Text style={styles.bank}>Orbit Bank</Text>
          </LinearGradient>

          <GradientButton
            title="Enviar transferência"
            onPress={handleTransfer}
          />
        </ScrollView>

        {sending && (
          <LoadingAction
            loading={loading}
            actionMessage="Transferência enviada com sucesso!"
            error={error}
            message={message}
          />
        )}
      </View>

      <PinChecker
        isOpen={showPin}
        onCancel={() => setShowPin(false)}
        onSuccess={(pin) => confirmTransfer(pin)}
      />
    </>
  );
}
