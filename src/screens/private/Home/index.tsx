import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  CreditCardIcon,
  ReceiptIcon,
  BarcodeIcon,
  ChartLineUpIcon,
} from "phosphor-react-native";
import { useState, useRef } from "react";
import { styles } from "./styles";
import Card from "../../../components/Card";

export default function Home() {
  const [hideBalance, setHideBalance] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  function openCard() {
    setShowCard(true);
    scale.setValue(0.85);
    Animated.spring(scale, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }

  function closeCard() {
    Animated.timing(scale, {
      toValue: 0.1,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setShowCard(false));
  }

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.top}>
          <View style={styles.header}>
            <Text style={styles.greeting}>
              Olá, <Text style={styles.name}>Murilo!</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.notifications}>
            <Feather name="bell" size={30} color="#0d1b2a" />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={["#0d1b2a", "#1b263b", "#415a77"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balance}
        >
          <View style={styles.balanceContainer}>
            <Text style={styles.title}>Saldo atual</Text>
            <Text style={styles.number}>
              {hideBalance ? "R$ ••••" : "R$ 1.000,00"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.eye}
            onPress={() => setHideBalance(!hideBalance)}
          >
            <Feather
              name={hideBalance ? "eye" : "eye-off"}
              size={30}
              color="#e0f2ff"
            />
          </TouchableOpacity>
        </LinearGradient>

        <Text style={styles.section}>Serviços</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.services}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Pix")}
            style={styles.serviceButton}
          >
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceCircle}
            >
              <Image
                source={require("../../../assets/newPixLogo.png")}
                style={styles.pixIcon}
                resizeMode="contain"
              />
            </LinearGradient>
            <Text style={styles.serviceName}>Área Pix</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openCard} style={styles.serviceButton}>
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceCircle}
            >
              <CreditCardIcon size={40} color="#e0f2ff" />
            </LinearGradient>
            <Text style={styles.serviceName}>Cartão virtual</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("PayPix")}
            style={styles.serviceButton}
          >
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceCircle}
            >
              <BarcodeIcon size={40} color="#e0f2ff" />
            </LinearGradient>
            <Text style={styles.serviceName}>Pagar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Statement")}
            style={styles.serviceButton}
          >
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceCircle}
            >
              <ReceiptIcon size={40} color="#e0f2ff" />
            </LinearGradient>
            <Text style={styles.serviceName}>Extrato</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceButton}>
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceCircle}
            >
              <ChartLineUpIcon size={40} color="#e0f2ff" />
            </LinearGradient>
            <Text style={styles.serviceName}>Investimentos</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.section}>Pagamentos pendentes</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pendents}
        >
          {[1, 2, 3].map((i) => (
            <LinearGradient
              key={i}
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            />
          ))}
        </ScrollView>
      </ScrollView>

      {showCard && (
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalOutside} onPress={closeCard} />

          <Animated.View style={{ transform: [{ scale }] }}>
            <Card />
          </Animated.View>
        </View>
      )}
    </View>
  );
}
