import { View, Text, Image, ActivityIndicator, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import api from "services/api";

type CardProps = {
  expirationDate: string;
};

export default function Card() {
  const [name, setName] = useState<string | null>(null);
  const [card, setCard] = useState<CardProps | null>(null);
  const [expiration, setExpiration] = useState("");
  const [loading, setLoading] = useState(true);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/me");
        const creditCard = response.data.creditCards[0];

        setCard(creditCard);
        setName(response.data.name);

        const expirationDate = new Date(
          creditCard.expirationDate
        ).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        });
        setExpiration(expirationDate);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

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
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <Animated.View
      style={[styles.cardContainer, { opacity, transform: [{ scale }] }]}
    >
      <LinearGradient
        colors={["#0d1b2a", "#1b263b", "#415a77"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Image
          source={require("../../assets/contactless.png")}
          style={styles.contactless}
          resizeMode="contain"
        />

        <View style={styles.userInfo}>
          <Text style={styles.number}>{expiration}</Text>
          <Text style={styles.title}>{name}</Text>
        </View>

        <Image
          source={require("../../assets/mastercardLogo.png")}
          style={styles.mastercard}
          resizeMode="contain"
        />
      </LinearGradient>
    </Animated.View>
  );
}
