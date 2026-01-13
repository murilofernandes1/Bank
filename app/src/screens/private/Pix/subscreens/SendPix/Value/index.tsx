import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackButton from "../../../../../../components/BackButton";
import GlobalButton from "../../../../../../components/GlobalButton";
import CurrencyInput from "react-native-currency-input";
import { LinearGradient } from "expo-linear-gradient";
import { MoneyIcon, CreditCardIcon } from "phosphor-react-native";
import { useTransfer } from "../../../../../../hooks/useTransfer";
import { useAuth } from "hooks/useAuth";
import { styles } from "./styles";

interface MethodProps {
  id: number;
  key: "PIX" | "CARD";
  methodName: string;
}

const paymentMethods: MethodProps[] = [
  { id: 1, key: "PIX", methodName: "Dinheiro em conta" },
  { id: 2, key: "CARD", methodName: "Cartão de crédito" },
];

export default function PixValue() {
  const { setAmount, setMethod } = useTransfer();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [exceededLimit, setExceededLimit] = useState(false);
  const { card, user } = useAuth();
  const [value, setValue] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "CARD" | null>(
    null
  );

  const disabled =
    !(typeof value === "number" && value > 0) ||
    !paymentMethod ||
    (paymentMethod === "PIX" && user.balance < value) ||
    (paymentMethod === "CARD" && card.currentLimit < value);

  const selectedMethod = paymentMethods.find((m) => m.key === paymentMethod);

  useEffect(() => {
    if (value && card.currentLimit < value) {
      setExceededLimit(true);
    } else {
      setExceededLimit(false);
    }
  }, [value, card.currentLimit]);

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Digite o valor da transferência</Text>

        <CurrencyInput
          value={value}
          onChangeValue={(v) => {
            setTouched(true);
            setValue(v ?? 0);
          }}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          style={styles.valueInput}
          placeholder="R$ 0,00"
          placeholderTextColor={"#0f172a"}
          keyboardType="number-pad"
        />

        <Text style={styles.methodTitle}>Escolha o método de pagamento</Text>

        <View style={styles.services}>
          {paymentMethods.map((m) => (
            <TouchableOpacity
              key={m.id}
              onPress={() => {
                setPaymentMethod(m.key);
                setMethod(m.key);
              }}
              style={
                paymentMethod === m.key
                  ? styles.notSelected
                  : styles.serviceButton
              }
            >
              <LinearGradient
                colors={["#0d1b2a", "#1b263b", "#415a77"]}
                style={styles.serviceCircle}
              >
                {m.key === "PIX" ? (
                  <MoneyIcon size={28} color="#e0f2ff" />
                ) : (
                  <>
                    <CreditCardIcon size={28} color="#e0f2ff" />
                  </>
                )}
              </LinearGradient>

              <Text style={styles.serviceName}>{m.methodName}</Text>
              {m.key === "CARD" ? (
                <Text style={styles.limit}>
                  Limite disponível:{" "}
                  {card.currentLimit.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              ) : (
                <Text style={styles.limit}>
                  Saldo:{" "}
                  {user.balance.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {paymentMethod === "PIX" && user.balance < value ? (
          <Text style={styles.errorText}>Saldo em conta insuficiente</Text>
        ) : null}
        {paymentMethod === "CARD" && card.currentLimit < value ? (
          <Text style={styles.errorText}>
            Limite do cartão de crédito insuficiente
          </Text>
        ) : null}
        <GlobalButton
          title={
            paymentMethod
              ? `Pagar com ${selectedMethod?.methodName}`
              : "Escolha um método de pagamento"
          }
          disabled={disabled}
          onPress={() => {
            if (!paymentMethod || !value) return;
            setAmount(value);
            navigation.navigate("ConfirmPix", {
              methodName: selectedMethod!.methodName,
            });
          }}
        />
      </ScrollView>
    </View>
  );
}
