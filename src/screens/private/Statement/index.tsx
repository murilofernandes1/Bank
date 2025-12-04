import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { ArrowsLeftRightIcon } from "phosphor-react-native";
import BackButton from "../../../components/BackButton";
export default function Statement() {
  return (
    <>
      <View style={styles.screen}>
        <BackButton />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>Transações recentes</Text>

          <View style={styles.recentTransactions}>
            {[1, 2].map((i) => (
              <LinearGradient
                key={i}
                colors={["#0d1b2a", "#1b263b", "#415a77"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardRecentItem}
              >
                <ArrowsLeftRightIcon size={32} color="#e0f2ff" weight="bold" />
                <View style={styles.transactionInfo}>
                  <Text style={styles.titleTransaction}>
                    {i === 1 ? "Pix para Fulano" : "Pix de Ciclano"}
                  </Text>
                </View>
                <Text style={i === 1 ? styles.exitValue : styles.entryValue}>
                  {i === 1 ? "-R$ 10,00" : "+R$ 10,00"}
                </Text>
              </LinearGradient>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
