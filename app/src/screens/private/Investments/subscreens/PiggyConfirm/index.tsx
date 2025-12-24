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

  async function handleConfirm() {
    try {
      setSending(true);
      setLoading(true);

      setTimeout(async () => {
        if (type === "DEPOSIT") {
          try {
            await api.put(`me/savings/${piggyId}/deposit`, { amount });
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            await api.put(`me/savings/${piggyId}/withdraw`, { amount });
          } catch (error) {
            console.log(error);
          }
        }
        setLoading(false);
        setMessage(true);
        setTimeout(() => {
          navigation.replace("Home");
        }, 2500);
      }, 2000);
    } catch {
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
          onPress={handleConfirm}
        />
      </ScrollView>

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
