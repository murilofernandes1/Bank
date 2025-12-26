import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackButton from "components/BackButton";
import GlobalButton from "components/GlobalButton";
import CurrencyInput from "react-native-currency-input";
import { LinearGradient } from "expo-linear-gradient";
import { MoneyIcon, CreditCardIcon } from "phosphor-react-native";
import { styles } from "./styles";

interface RouteParams {
  piggyId: string;
  currentAmount: number;
  type: "DEPOSIT" | "WITHDRAW";
}

const paymentMethods = [
  { id: 1, key: "MONEY", label: "Dinheiro em conta" },
  { id: 2, key: "CREDIT_CARD", label: "Cartão de crédito" },
];

export default function PiggyValue() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { piggyId, type, currentAmount } = route.params as RouteParams;

  const [value, setValue] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const [invalidValue, setInvalidValue] = useState(false);
  const [method, setMethod] = useState("MONEY");

  const disabled = !value || value <= 0 || invalidValue;

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          {type === "DEPOSIT"
            ? "Quanto você quer adicionar?"
            : "Quanto você quer resgatar?"}
        </Text>

        <CurrencyInput
          value={value}
          onChangeValue={(v) => {
            setInvalidValue(false);
            setTouched(true);
            setValue(v);
            v > currentAmount && setInvalidValue(true);
          }}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          style={styles.valueInput}
          placeholder="R$ 0,00"
          keyboardType="numeric"
        />

        {touched && (!value || value <= 0) && (
          <Text style={styles.errorText}>Informe um valor maior que zero</Text>
        )}
        {invalidValue && (
          <Text style={styles.errorText}>Seu porquinho não tem esse valor</Text>
        )}
        {type === "DEPOSIT" && (
          <>
            <Text style={styles.methodTitle}>Escolha o método</Text>

            <View style={styles.services}>
              {paymentMethods.map((m) => (
                <TouchableOpacity
                  key={m.id}
                  onPress={() => setMethod(m.key)}
                  style={
                    method === m.key ? styles.notSelected : styles.serviceButton
                  }
                >
                  <LinearGradient
                    colors={["#0d1b2a", "#1b263b", "#415a77"]}
                    style={styles.serviceCircle}
                  >
                    {m.key === "MONEY" ? (
                      <MoneyIcon size={28} color="#e0f2ff" />
                    ) : (
                      <CreditCardIcon size={28} color="#e0f2ff" />
                    )}
                  </LinearGradient>
                  <Text style={styles.serviceName}>{m.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <GlobalButton
          title="Continuar"
          disabled={disabled}
          onPress={() =>
            navigation.navigate("PiggyConfirm", {
              piggyId,
              amount: value,
              type,
            })
          }
        />
      </ScrollView>
    </View>
  );
}
