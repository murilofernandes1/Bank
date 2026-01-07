import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Image,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";

import BackButton from "components/BackButton";
import GlobalButton from "components/GlobalButton";
import { useAuth } from "hooks/useAuth";
import { styles } from "./styles";

export default function CreditCard() {
  const { user, card, invoice } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [loading, setLoading] = useState(true);
  const [expirationCard, setExpirationCard] = useState("");
  const [dueClosed, setDueClosed] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  // Proteção: só executa se existir cartão
  useEffect(() => {
    if (!card) return;

    setDueClosed(
      invoice ? new Date(invoice.invoiceDueDate).getTime() < Date.now() : false
    );

    setExpirationCard(
      new Date(card.expirationDate).toLocaleDateString("pt-BR", {
        month: "2-digit",
        year: "2-digit",
      })
    );

    setLoading(false);
  }, [card, invoice]);

  useEffect(() => {
    if (!loading) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading]);

  if (loading || !user || !card) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0d1b2a" />
      </View>
    );
  }

  const invoiceAmount = invoice?.totalAmount ?? 0;
  const isInvoiceZero = invoiceAmount === 0;
  const disablePayment = dueClosed || isInvoiceZero;

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Meu Cartão de Crédito</Text>

        <Text style={styles.subtitle}>
          Acompanhe sua fatura, vencimento e visualize seu cartão virtual.
        </Text>

        <LinearGradient
          colors={["#0d1b2a", "#1b263b", "#415a77"]}
          style={styles.invoiceCard}
        >
          <Text style={styles.cardLabel}>Fatura atual</Text>

          {invoice ? (
            <Text style={styles.cardValue}>
              {invoice.totalAmount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          ) : (
            <Text style={styles.cardValue}>R$ 0,00</Text>
          )}
          <Text style={styles.availableLimit}>
            Limite disponível:{" "}
            {card.currentLimit != null
              ? card.currentLimit.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "-"}
          </Text>

          {dueClosed ? (
            <View style={styles.badgeClosed}>
              <Text style={styles.badgeText}>Fatura fechada</Text>
            </View>
          ) : invoice ? (
            <Text style={styles.exp}>
              Vencimento em{" "}
              {new Date(card.invoiceDueDate).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              })}
            </Text>
          ) : null}
        </LinearGradient>

        <View style={styles.actionArea}>
          <GlobalButton
            title={
              isInvoiceZero
                ? "Fatura zerada"
                : dueClosed
                ? "Pagamento indisponível"
                : "Pagar fatura"
            }
            disabled={disablePayment}
            onPress={() => {
              navigation.navigate("PayCreditCard", {
                invoice: invoiceAmount,
              });
            }}
          />

          {dueClosed && (
            <Text style={styles.helperInline}>
              Sua fatura atual já foi encerrada. O pagamento ficará disponível
              na próxima abertura.
            </Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Seu cartão virtual</Text>
        <Text style={styles.sectionDesc}>
          Utilize este cartão para compras online com total segurança.
        </Text>

        <Animated.View
          style={[styles.cardContainer, { opacity, transform: [{ scale }] }]}
        >
          <LinearGradient
            colors={["#0d1b2a", "#1b263b", "#415a77"]}
            style={styles.creditCard}
          >
            <View style={styles.orbitWrapper}>
              <View style={styles.orbit}>
                <LinearGradient
                  colors={["#e0f2ff", "#778da9"]}
                  style={styles.orbitCenter}
                />
                <LinearGradient
                  colors={["#e0f2ff", "#778da9"]}
                  style={styles.orbitDot}
                />
              </View>
            </View>

            <Image
              source={require("../../../assets/contactless.png")}
              style={styles.contactless}
            />

            <View style={styles.userInfo}>
              <View style={styles.numberContainer}>
                <Text style={styles.number}>{expirationCard}</Text>
                <Text style={styles.number}>{card.cvv ?? "-"}</Text>
              </View>

              <Text style={styles.cardNumber}>
                {String(card.number ?? "")
                  .match(/.{1,4}/g)
                  ?.join(" ")}
              </Text>

              <Text style={styles.title}>{user.name}</Text>
            </View>

            <Image
              source={require("../../../assets/mastercardLogo.png")}
              style={styles.mastercard}
            />
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
