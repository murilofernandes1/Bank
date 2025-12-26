import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackButton from "../../../../../../components/BackButton";
import CurrencyInput from "react-native-currency-input";

import { styles } from "./styles";
import GlobalButton from "../../../../../../components/GlobalButton";

export default function ReceiveValue() {
  const [amount, setAmount] = useState<number | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const disabled = !(typeof value === "number" && value > 0);

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Quanto deseja receber?</Text>

        <CurrencyInput
          value={amount}
          onChangeValue={(a) => {
            setAmount(a);
          }}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          style={styles.valueInput}
          placeholder="R$ 0,00"
          keyboardType="numeric"
        />

        <GlobalButton
          disabled={disabled}
          title="Continuar"
          onPress={() => {
            navigation.navigate("QR", { amount: amount });
          }}
        />
      </ScrollView>
    </View>
  );
}
