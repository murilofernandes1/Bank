import { View, ScrollView, Text } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CurrencyInput from "react-native-currency-input";

import BackButton from "../../../../../components/BackButton";
import GlobalButton from "../../../../../components/GlobalButton";
import LoadingAction from "../../../../../components/LoadingAction";

import { styles } from "./styles";
import api from "services/api";

interface CreditCardProps {
  key: string;
  name: string;
  invoice: number | null;
  invoiceId: string;
}

type RootStackParamList = {
  PayCreditCard: CreditCardProps;
};

type PayCreditCardRouteProp = RouteProp<RootStackParamList, "PayCreditCard">;

export default function PayCreditCard() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<PayCreditCardRouteProp>();

  const [value, setValue] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const invoiceAmount = route.params.invoice;
  const invoiceId = route.params.invoiceId;

  const disabled =
    !value || value <= 0 || (invoiceAmount !== null && value > invoiceAmount);

  async function handlePay() {
    try {
      setSending(true);
      setLoading(true);
      await api.post(`/card/invoice/${invoiceId}`, { invoiceAmount });
      setTimeout(() => {
        setLoading(false);
        setMessage(true);

        setTimeout(() => {
          navigation.navigate("Home");
        }, 3000);
      }, 3000);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setSending(false);
        navigation.navigate("Home");
      }, 3000);
      console.log(error);
    }
  }

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Quanto deseja pagar da sua fatura em aberto?
        </Text>

        <Text style={styles.subtitle}>
          Valor da fatura em aberto:{" "}
          {invoiceAmount !== null
            ? invoiceAmount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              })
            : "R$ 0,00"}
        </Text>

        <CurrencyInput
          value={value}
          onChangeValue={setValue}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          style={styles.valueInput}
          placeholder="R$ 0,00"
          keyboardType="numeric"
        />

        <GlobalButton
          title="Pagar fatura"
          disabled={disabled}
          onPress={handlePay}
        />
      </ScrollView>

      {sending && (
        <LoadingAction
          loading={loading}
          message={message}
          error={error}
          actionMessage="Fatura paga com sucesso!"
        />
      )}
    </View>
  );
}
