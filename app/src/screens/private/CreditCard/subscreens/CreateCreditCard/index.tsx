import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import api from "services/api";
import LoadingAction from "components/LoadingAction";
import GlobalButton from "../../../../../components/GlobalButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackButton from "components/BackButton";
import { styles } from "./styles";

const days = ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28"];

export default function CreateCreditCard() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [day, setDay] = useState<string | null>(null);

  const { user, loadUser } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  async function createCreditCard() {
    if (!day || sending) return;

    setSending(true);
    setError(false);
    setMessage(false);

    try {
      await api.post("/card/create", {
        invoiceClosingDay: Number(day),
      });

      setMessage(true);
      await loadUser();
      setTimeout(() => {
        setSending(false);
        navigation.navigate("Home");
      }, 2500);
    } catch (err) {
      setError(true);

      setTimeout(() => {
        setSending(false);
        navigation.navigate("Home");
      }, 2500);
    }
  }

  return (
    <>
      <View style={styles.screen}>
        <BackButton />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            Bem-vindo, {user?.name?.split(" ")[0]}!
          </Text>

          <Text style={styles.subtitle}>
            Seu cartão de crédito gratuito, sem taxas escondidas e com controle
            total pelo app.
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>
              Quais são os diferenciais do cartão virtual Orbit?
            </Text>
            <Text style={styles.infoText}>
              Com o cartão Orbit você tem vantagens exclusivas, acumula pontos
              para trocar por produtos e muito mais!
            </Text>
          </View>

          <Text style={styles.sectionTitle}>
            Qual o melhor dia para o vencimento da sua fatura?
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysContainer}
          >
            {days.map((value) => {
              const selected = day === value;

              return (
                <TouchableOpacity
                  key={value}
                  activeOpacity={0.85}
                  onPress={() => setDay(value)}
                  style={[styles.dayCard, selected && styles.dayCardSelected]}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      selected && styles.dayNumberSelected,
                    ]}
                  >
                    {value}
                  </Text>
                  <Text
                    style={[
                      styles.dayLabel,
                      selected && styles.dayLabelSelected,
                    ]}
                  >
                    todo mês
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {day && (
            <View style={styles.confirmationBox}>
              <Text style={styles.confirmationText}>
                Sua fatura vencerá todo dia{" "}
                <Text style={styles.bold}>{day}</Text>
              </Text>
            </View>
          )}

          <GlobalButton
            title="Solicitar meu cartão de crédito"
            disabled={!day || sending}
            onPress={createCreditCard}
          />
        </ScrollView>
      </View>

      {sending && (
        <LoadingAction
          loading
          message={message}
          error={error}
          actionMessage="Deu tudo certo! Seu cartão já está disponível"
        />
      )}
    </>
  );
}
