import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BackButton from "../../../../../../components/BackButton";
import GradientButton from "../../../../../../components/GlobalButton";
import CurrencyInput from "react-native-currency-input";

import { styles } from "./styles";

export default function ReceiveValue() {
  const [value, setValue] = useState<number | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleContinue = () => {
    if (value) {
      navigation.navigate("QR", { value: String(value) });
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

        <GradientButton title="Continuar" onPress={handleContinue} />
      </ScrollView>
    </View>
  );
}
