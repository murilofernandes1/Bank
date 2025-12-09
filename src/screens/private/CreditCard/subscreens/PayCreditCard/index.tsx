import { View, ScrollView, Text } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoadingAction from "../../../../../components/LoadingAction";
import BackButton from "../../../../../components/BackButton";
import GradientButton from "../../../../../components/GlobalButton";
import CurrencyInput from "react-native-currency-input";

import { styles } from "./styles";

export default function PayCreditCard() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [value, setValue] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
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
        <Text style={styles.header}>
          Quanto deseja pagar da sua fatura em aberto?
        </Text>
        <Text style={styles.subtitle}>Valor da fatura em aberto: R$287,37</Text>

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
