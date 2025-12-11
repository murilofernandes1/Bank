import { View, ScrollView, Text } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoadingAction from "../../../../../components/LoadingAction";
import BackButton from "../../../../../components/BackButton";
import GradientButton from "../../../../../components/GlobalButton";
import CurrencyInput from "react-native-currency-input";
import { useRoute, RouteProp } from "@react-navigation/native";
import { styles } from "./styles";

interface CreditCardProps {
  key: string;
  name: string;
  invoice: number | null;
}
type RootStackParamList = {
  PayCreditCard: CreditCardProps;
};
type ConfirmCreditCardPay = RouteProp<RootStackParamList, "PayCreditCard">;

export default function PayCreditCard() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<ConfirmCreditCardPay>();
  const [value, setValue] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const invoiceAmount = route.params.invoice;
  async function fakeLoading() {
    try {
      setSending(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setMessage(true);
        setTimeout(() => {
          navigation.navigate("Home");
        }, 3000);
      }, 3000);
    } catch (error) {
      setError(true);
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
          {invoiceAmount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
          })}
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

        <GradientButton title="Continuar" onPress={fakeLoading} />
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
