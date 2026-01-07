import { View, ScrollView, Text } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CurrencyInput from "react-native-currency-input";
import { useTransfer } from "hooks/useTransfer";
import BackButton from "../../../../../components/BackButton";
import GlobalButton from "../../../../../components/GlobalButton";
import LoadingAction from "../../../../../components/LoadingAction";
import PinChecker from "components/PinHandler";
import { styles } from "./styles";

interface CreditCardProps {
  key: string;
  name: string;
  invoice: number | null;
}

type RootStackParamList = {
  PayCreditCard: CreditCardProps;
};

type PayCreditCardRouteProp = RouteProp<RootStackParamList, "PayCreditCard">;

export default function PayCreditCard() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<PayCreditCardRouteProp>();
  const { PayInvoice } = useTransfer();

  const [value, setValue] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const invoiceAmount = route.params.invoice;

  const disabled =
    !value || value <= 0 || (invoiceAmount !== null && value > invoiceAmount);

  async function handlePay(pin: string) {
    try {
      setShowPin(false);
      setSending(true);
      setLoading(true);

      await PayInvoice(pin, value!);

      setLoading(false);
      setMessage(true);

      setTimeout(() => {
        setSending(false);
        setMessage(false);
        navigation.navigate("Home");
      }, 3000);
    } catch {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        navigation.navigate("Home");
      }, 3000);
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
          onPress={() => setShowPin(true)}
        />
      </ScrollView>

      <PinChecker
        isOpen={showPin}
        onCancel={() => setShowPin(false)}
        onSuccess={handlePay}
      />

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
