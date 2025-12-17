import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "../../../components/GlobalButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { styles } from "./styles";
import api from "services/api";

type CardProps = {
  invoiceAmount?: number;
};

export default function CreditCard() {
  const [card, setCard] = useState<CardProps | null>(null);
  const [expiration, setExpiration] = useState("");
  const [invoice, setInvoice] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [dueClosed, setDueClosed] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/me");
        const creditCard = response.data.creditCards[0];
        const invoiceDate = new Date(creditCard.invoiceDueDate).getTime();

        if (invoiceDate > Date.now()) {
          setDueClosed(true);
        }
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

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
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
              <Text style={styles.value}>
                {card?.invoiceAmount?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                })}
              </Text>
              <Text style={styles.exp}>
                {dueClosed === true ? (
                  <Text style={styles.date}>Vencimento em {expiration}</Text>
                ) : (
                  "Fatura fechada"
                )}
              </Text>
            </LinearGradient>
            <GradientButton
              title="Pagar fatura"
              onPress={() => navigation.navigate("PayCreditCard", { invoice })}
            />
          </ScrollView>
        </View>
      )}
    </>
  );
}
