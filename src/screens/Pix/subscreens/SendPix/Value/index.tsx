import { View, Text, ScrollView } from "react-native";
import BackButton from "../../../../../components/BackButton";
import { styles } from "./styles";
import GradientButton from "../../../../../components/GlobalButton";
import CurrencyInput from "react-native-currency-input";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";

export default function PixValue() {
  const [value, setValue] = useState<number | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={styles.screen}>
      <BackButton />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Digite o valor da transferência</Text>

        <View style={styles.inputContainer}>
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
        </View>

        <View style={styles.send}>
          <GradientButton
            title="Continuar"
            onPress={() => navigation.navigate("ConfirmPix")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
