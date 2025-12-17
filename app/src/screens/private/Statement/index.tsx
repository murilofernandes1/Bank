import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { ArrowsLeftRightIcon } from "phosphor-react-native";
import BackButton from "../../../components/BackButton";

interface TransacoesProps {
  id: number;
  title: string;
  type: "Exit" | "Entry";
  value: number;
}

export default function Statement() {
  let transacoes: TransacoesProps[] = [
    { id: 1, title: "Pix de Murilo", type: "Entry", value: 100 },
    { id: 2, title: "Pix para Kelverlyson", type: "Exit", value: 1000 },
  ];
  return (
    <>
      <View style={styles.screen}>
        <BackButton />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Extrato</Text>
          <Text style={styles.subtitle}>
            Acompanhe suas transações recentes
          </Text>

          <View style={styles.recentTransactions}>
            {transacoes.map((i) => (
              <LinearGradient
                key={i.id}
                colors={["#0d1b2a", "#1b263b", "#415a77"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardRecentItem}
              >
                <ArrowsLeftRightIcon size={32} color="#e0f2ff" weight="bold" />
                <View style={styles.transactionInfo}>
                  <Text style={styles.titleTransaction}>{i.title}</Text>
                </View>
                <Text>
                  {i.type === "Entry" ? (
                    <Text style={styles.entryValue}>+R${i.value}</Text>
                  ) : (
                    <Text style={styles.exitValue}>-R${i.value}</Text>
                  )}
                </Text>
              </LinearGradient>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
