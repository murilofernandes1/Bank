import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import BackButton from "components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import GlobalButton from "components/GlobalButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { styles } from "./styles";
import api from "services/api";

type CardProps = {
  invoiceAmount?: number;
  invoiceDueDate?: string;
};

export default function CreditCard() {
  const [card, setCard] = useState<CardProps | null>(null);
  const [expiration, setExpiration] = useState("");
  const [invoice, setInvoice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [dueClosed, setDueClosed] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/me");
        const creditCard = response.data.creditCards[0];

        const invoiceDate = new Date(creditCard.invoiceDueDate).getTime();
        setDueClosed(invoiceDate < Date.now());

        setCard(creditCard);
        setInvoice(creditCard.invoiceAmount);
        setExpiration(
          new Date(creditCard.invoiceDueDate).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0d1b2a" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Meu Cartão de Crédito</Text>

        <LinearGradient
          colors={["#0d1b2a", "#1b263b", "#415a77"]}
          style={styles.card}
        >
          <Text style={styles.cardLabel}>Fatura atual</Text>

          <Text style={styles.cardValue}>
            {invoice.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>

          <View style={styles.cardFooter}>
            {dueClosed ? (
              <View style={styles.badgeClosed}>
                <Text style={styles.badgeText}>Fatura fechada</Text>
              </View>
            ) : (
              <Text style={styles.cardExpiration}>
                Vencimento em <Text style={styles.bold}>{expiration}</Text>
              </Text>
            )}
          </View>
        </LinearGradient>

        <View style={styles.actionArea}>
          <GlobalButton
            title={dueClosed ? "Pagamento indisponível" : "Pagar fatura"}
            disabled={dueClosed}
            onPress={() =>
              navigation.navigate("PayCreditCard", {
                invoice,
              })
            }
          />

          {dueClosed && (
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>
                Sua fatura atual já foi encerrada. O pagamento ficará disponível
                assim que a próxima fatura for aberta.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
