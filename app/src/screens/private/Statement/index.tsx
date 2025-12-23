import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import {
  ArrowsLeftRightIcon,
  WindIcon,
  EmptyIcon,
} from "phosphor-react-native";
import BackButton from "../../../components/BackButton";
import { useState, useEffect } from "react";
import { useAuth } from "hooks/useAuth";
import api from "services/api";
import LoadingScreen from "components/LoadingScreen";

interface TransacoesProps {
  id: string;
  destinationId: string;
  user: {
    name: string;
  };
  destinationUser: {
    name: string;
  };
  amount: number;
}

export default function Statement() {
  const [transfers, setTransfers] = useState<TransacoesProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function loadTransfers() {
      try {
        const response = await api.get("/me/transfers");
        setTransfers(response.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadTransfers();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
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
            {transfers.length === 0 && (
              <View style={styles.emptyContainer}>
                <EmptyIcon size={64} color="grey" weight="thin" />
                <Text style={styles.emptyText}>
                  Nenhuma transação encontrada
                </Text>
              </View>
            )}
            {transfers.map((i) => (
              <LinearGradient
                key={i.id}
                colors={["#0d1b2a", "#1b263b", "#415a77"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardRecentItem}
              >
                <ArrowsLeftRightIcon size={32} color="#e0f2ff" weight="bold" />
                <View style={styles.transactionInfo}>
                  {i.destinationId === user.id ? (
                    <Text style={styles.titleTransaction}>
                      Transferência de {i.user.name.split(" ")[0]}
                    </Text>
                  ) : (
                    <Text style={styles.titleTransaction}>
                      Transferência para {i.destinationUser.name.split(" ")[0]}
                    </Text>
                  )}
                </View>
                <Text>
                  {i.destinationId === user.id ? (
                    <Text style={styles.entryValue}>
                      +
                      {i.amount.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Text>
                  ) : (
                    <Text style={styles.exitValue}>
                      -
                      {i.amount.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Text>
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
