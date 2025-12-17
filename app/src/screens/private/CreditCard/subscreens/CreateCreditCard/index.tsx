import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import { styles } from "./styles";
import api from "services/api";
import LoadingAction from "components/LoadingAction";
import GlobalButton from "../../../../../components/GlobalButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackButton from "components/BackButton";

type UserProps = {
  id: string;
  name: string;
};

export default function CreateCreditCard() {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [day, setDay] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    async function loadUser() {
      try {
        const response = await api.get("/me");
        setUser(response.data);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }

    loadUser();
  }, [token]);

  function getOpacity(value: string) {
    return day === value ? 0.5 : 1;
  }

  async function createCreditCard() {
    if (!day) return;

    try {
      setSending(true);
      setLoading(true);
      await api.post("/me/card", { dueDay: day });
      setLoading(false);
      setMessage(true);
      setTimeout(() => navigation.navigate("Home"), 3000);
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  if (loading && !sending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0d1b2a" />
      </View>
    );
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
          <Text style={styles.title}>
            Bem vindo, {user?.name?.split(" ")[0] ?? "Nome"}!
          </Text>

          <Text style={styles.subtitle}>
            Vamos começar criando seu cartão de crédito gratuito e com a
            transparência que só a Orbit tem!
          </Text>

          <Text style={styles.subtitle2}>
            Qual a melhor dia para o vencimento da sua fatura?
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.services}
          >
            {["5", "11", "21", "27"].map((value) => (
              <TouchableOpacity
                key={value}
                onPress={() => setDay(value)}
                style={styles.serviceButton}
              >
                <LinearGradient
                  colors={["#0d1b2a", "#1b263b", "#415a77"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.serviceCircle, { opacity: getOpacity(value) }]}
                >
                  <Text style={styles.number}>{value}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <GlobalButton title="Criar meu cartão" onPress={createCreditCard} />
        </ScrollView>
      </View>

      {sending && (
        <LoadingAction
          loading={loading}
          message={message}
          actionMessage="Cartão de crédito criado com sucesso!"
          error={error}
        />
      )}
    </>
  );
}
