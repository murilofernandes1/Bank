import { View, Text, Image, ActivityIndicator, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { styles } from "./styles";
import api from "services/api";

export default function Card() {
  const { user } = useAuth();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
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
  }, []);

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
          source={require("../../assets/contactless.png")}
          style={styles.contactless}
          resizeMode="contain"
        />

        <View style={styles.userInfo}>
          <Text style={styles.number}>
            {new Date(user.creditCard.expirationDate).toLocaleDateString(
              "pt-BR",
              { day: "2-digit", month: "2-digit" }
            )}
          </Text>
          <Text style={styles.title}>{user.name}</Text>
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
