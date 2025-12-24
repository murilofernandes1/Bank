import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackButton from "../../../../../../components/BackButton";
import GlobalButton from "../../../../../../components/GlobalButton";
import CurrencyInput from "react-native-currency-input";
import { LinearGradient } from "expo-linear-gradient";
import { MoneyIcon, CreditCardIcon } from "phosphor-react-native";
import { useTransfer } from "../../../../../../hooks/useTransfer";
import { styles } from "./styles";

interface MethodProps {
  id: number;
  key: "MONEY" | "CREDIT_CARD";
  methodName: string;
}

const paymentMethods: MethodProps[] = [
  { id: 1, key: "MONEY", methodName: "Dinheiro em conta" },
  { id: 2, key: "CREDIT_CARD", methodName: "Cartão de crédito" },
];

export default function PixValue() {
  const { setAmount } = useTransfer();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [value, setValue] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const [selectedMethodKey, setSelectedMethodKey] = useState<string | null>(
    "MONEY"
  );

  const chooseMethod = (key: string) => {
    setSelectedMethodKey(key);
  };

  const selectedMethod = paymentMethods.find(
    (m) => m.key === selectedMethodKey
  );
  const isButtonDisabled = !value || value <= 0 || !selectedMethodKey;
  const methodName = selectedMethod ? selectedMethod.methodName : "";

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Digite o valor da transferência</Text>

        <CurrencyInput
          value={value}
          onChangeValue={(v) => {
            setTouched(true);
            setValue(v);
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

        <Text style={styles.methodTitle}>Escolha o metódo de pagamento</Text>
        <View style={styles.services}>
          {paymentMethods.map((m) => {
            const isSelected = m.key === selectedMethodKey;

            return (
              <TouchableOpacity
                key={m.id}
                onPress={() => chooseMethod(m.key)}
                style={isSelected ? styles.notSelected : styles.serviceButton}
              >
                <LinearGradient
                  colors={["#0d1b2a", "#1b263b", "#415a77"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.serviceCircle}
                >
                  {m.key === "MONEY" ? (
                    <MoneyIcon size={30} color="#e0f2ff" />
                  ) : (
                    <CreditCardIcon size={30} color="#e0f2ff" />
                  )}
                </LinearGradient>
                <Text style={styles.serviceName}>{m.methodName}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <GlobalButton
          title={
            selectedMethod
              ? `Pagar com ${selectedMethod.methodName}`
              : "Selecione um método de pagamento"
          }
          onPress={() => {
            setAmount(value);
            navigation.navigate("ConfirmPix", {
              methodName: methodName,
            });
          }}
          disabled={isButtonDisabled}
        />
      </ScrollView>
    </View>
  );
}
