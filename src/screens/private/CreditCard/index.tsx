import { View, ScrollView, Text } from "react-native";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "../../../components/GlobalButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";

export default function CreditCard() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={styles.screen}>
      <BackButton />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Meu Cartão de Crédito</Text>
        <LinearGradient
          colors={["#0d1b2a", "#1b263b", "#415a77"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.invoice}>Fatura atual</Text>
          <Text style={styles.value}>R$ 287,37</Text>
          <Text style={styles.exp}>
            Vencimento em: <Text style={styles.date}>30/12</Text>
          </Text>
        </LinearGradient>
        <GradientButton
          title="Pagar fatura"
          onPress={() => navigation.navigate("PayCreditCard")}
        ></GradientButton>
      </ScrollView>
    </View>
  );
}
