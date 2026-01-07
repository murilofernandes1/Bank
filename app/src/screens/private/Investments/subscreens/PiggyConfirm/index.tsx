import { View, Text, ScrollView } from "react-native";
import BackButton from "components/BackButton";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { PiggyBankIcon } from "phosphor-react-native";
import GlobalButton from "components/GlobalButton";
import LoadingAction from "components/LoadingAction";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import api from "services/api";
import PinChecker from "components/PinHandler";

interface RouteParams {
  piggyId: string;
  amount: number;
  type: "DEPOSIT" | "WITHDRAW";
}

export default function PiggyConfirm() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { piggyId, amount, type } = route.params as RouteParams;

  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const [pinOpen, setPinOpen] = useState(false);

  async function executeOperation() {
    try {
      setSending(true);
      setLoading(true);

      if (type === "DEPOSIT") {
        await api.put(`me/savings/${piggyId}/deposit`, { amount });
      } else {
        await api.put(`me/savings/${piggyId}/withdraw`, { amount });
      }

      setLoading(false);
      setMessage(true);

      setTimeout(() => {
        navigation.goBack();
      }, 3500);
    } catch {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          {type === "DEPOSIT" ? "Confirmar aplicação" : "Confirmar resgate"}
        </Text>

        <LinearGradient
          colors={["#0d1b2a", "#1b263b", "#415a77"]}
          style={styles.card}
        >
          <PiggyBankIcon size={42} color="#e0f2ff" />
          <Text style={styles.value}>
            {amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </LinearGradient>

        <GlobalButton
          title={
            type === "DEPOSIT" ? "Confirmar aplicação" : "Confirmar resgate"
          }
          onPress={() => setPinOpen(true)}
        />
      </ScrollView>

      <PinChecker
        isOpen={pinOpen}
        onCancel={() => setPinOpen(false)}
        onSuccess={async () => {
          setPinOpen(false);
          await executeOperation();
        }}
      />

      {sending && (
        <LoadingAction
          loading={loading}
          message={message}
          error={error}
          actionMessage={
            type === "DEPOSIT"
              ? "Dinheiro guardado com sucesso!"
              : "Resgate realizado com sucesso!"
          }
        />
      )}
    </View>
  );
}
