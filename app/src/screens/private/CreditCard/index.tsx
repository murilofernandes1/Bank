import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Image,
  Animated,
} from "react-native";
import BackButton from "components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import GlobalButton from "components/GlobalButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useEffect, useRef } from "react";
import { styles } from "./styles";
import { useAuth } from "hooks/useAuth";
import { CreditCardProps } from "contexts/AuthContext";

export default function CreditCard() {
  const { user } = useAuth();
  const [expirationCard, setExpirationCard] = useState("");
  const [loading, setLoading] = useState(true);
  const [dueClosed, setDueClosed] = useState(false);
  const [card, setCard] = useState<CreditCardProps | null>();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (user?.creditCard) {
      const creditCard = user.creditCard;

      const invoiceDate = new Date(creditCard.invoiceDueDate).getTime();
      setDueClosed(invoiceDate < Date.now());

      const date = new Date(creditCard.expirationDate);
      setExpirationCard(
        date.toLocaleDateString("pt-BR", {
          month: "2-digit",
          year: "2-digit",
        })
      );
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0d1b2a" />
      </View>
    );
  }

  const invoiceAmount = user?.creditCard?.invoices?.[0]?.invoiceAmount ?? 0;

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
            {invoiceAmount.toLocaleString("pt-BR", {
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
                Vencimento em{" "}
                <Text style={styles.bold}>
                  {new Date(user.creditCard.invoiceDueDate).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                    }
                  )}
                </Text>
              </Text>
            )}
          </View>
        </LinearGradient>

        <Animated.View
          style={[
            styles.cardContainer,
            { opacity, transform: [{ scale }], marginBottom: 30 },
          ]}
        >
          <LinearGradient
            colors={["#0d1b2a", "#1b263b", "#415a77"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.creditCard}
          >
            <View style={styles.orbitWrapper}>
              <View style={styles.orbit}>
                <LinearGradient
                  colors={["#e0f2ff", "#778da9"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.orbitCenter}
                />
                <LinearGradient
                  colors={["#e0f2ff", "#778da9"]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.orbitDot}
                />
              </View>
            </View>

            <Image
              source={require("../../../assets/contactless.png")}
              style={styles.contactless}
              resizeMode="contain"
            />

            <View style={styles.userInfo}>
              <View style={styles.numberContainer}>
                <Text style={styles.number}>{expirationCard}</Text>
                <Text style={styles.number}>{user.creditCard.cvv} </Text>
              </View>
              <Text style={styles.cardNumber}>
                {String(user.creditCard.number)
                  .match(/.{1,4}/g)
                  ?.join(" ")}
              </Text>
              <Text style={styles.title}>{user.name}</Text>
            </View>

            <Image
              source={require("../../../assets/mastercardLogo.png")}
              style={styles.mastercard}
              resizeMode="contain"
            />
          </LinearGradient>
        </Animated.View>

        <View style={styles.actionArea}>
          <GlobalButton
            title={dueClosed ? "Pagamento indisponível" : "Pagar fatura"}
            disabled={dueClosed}
            onPress={() =>
              navigation.navigate("PayCreditCard", {
                invoice: invoiceAmount,
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
