import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackButton from "../../../../../../components/BackButton";
import GradientButton from "../../../../../../components/GlobalButton";
import CurrencyInput from "react-native-currency-input";

import { styles } from "./styles";

export default function ReceiveValue() {
  const [amount, setAmount] = useState<number | null>(null);
  const [empty, setEmpty] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleContinue = () => {
    if (amount) {
      setEmpty(false);
      navigation.navigate("QR", { amount: amount });
    } else {
      setEmpty(true);
    }
  };

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
          onChangeValue={setAmount}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          style={styles.valueInput}
          placeholder="R$ 0,00"
          keyboardType="numeric"
        />
        {empty && (
          <Text style={styles.error}>O valor não pode estar vazio.</Text>
        )}
        <GradientButton title="Continuar" onPress={handleContinue} />
      </ScrollView>
    </View>
  );
}
