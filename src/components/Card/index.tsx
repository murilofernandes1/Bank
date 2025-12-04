import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { styles } from "./styles";

export default function Card() {
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
        <Image
          source={require("../../assets/contactless.png")}
          style={styles.contactless}
          resizeMode="contain"
        />

        <View style={styles.userInfo}>
          <Text style={styles.number}>05/35</Text>
          <Text style={styles.title}>Kelverlyson Silva Santos Sousa</Text>
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
