import BackButton from "../../../components/BackButton";
import { ScrollView, View, Text } from "react-native";
import { styles } from "./styles";
export default function Investments() {
  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Investimentos</Text>
        <Text style={styles.subtitle}>
          Invista seu dinheiro no banco que mais rende no Brasil!
        </Text>
      </ScrollView>
    </View>
  );
}
