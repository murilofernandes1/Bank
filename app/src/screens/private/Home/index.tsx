import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
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
  ChartLineUpIcon,
  SignOutIcon,
} from "phosphor-react-native";
import { useRef, useState } from "react";
import { styles } from "./styles";
import { useAuth } from "../../../hooks/useAuth";
import Card from "../../../components/Card";

export default function Home() {
  const { Logout, user } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
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
              Olá,{" "}
              <Text style={styles.name}>
                {user?.name?.split(" ")[0] ?? "Usuário"}!
              </Text>
            </Text>
          </View>

          <TouchableOpacity onPress={Logout} style={styles.exit}>
            <SignOutIcon size={30} color="#0d1b2a" />
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
              {hideBalance
                ? "R$ ••••"
                : user?.balance?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
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

        <View style={styles.divisor} />

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
              style={styles.serviceCircle}
            >
              <CreditCardIcon size={40} color="#e0f2ff" />
            </LinearGradient>
            <Text style={styles.serviceName}>Cartão virtual</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Statement")}
            style={styles.serviceButton}
          >
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              style={styles.serviceCircle}
            >
              <ReceiptIcon size={40} color="#e0f2ff" />
            </LinearGradient>
            <Text style={styles.serviceName}>Extrato</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Investments")}
            style={styles.serviceButton}
          >
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              style={styles.serviceCircle}
            >
              <ChartLineUpIcon size={40} color="#e0f2ff" />
            </LinearGradient>
            <Text style={styles.serviceName}>Investimentos</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.divisor} />

        <Text style={styles.section}>Cartão de crédito</Text>

        {user?.creditCard ? (
          <TouchableOpacity onPress={() => navigation.navigate("CreditCard")}>
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              style={styles.card}
            >
              <Text style={styles.cardLabel}>Fatura atual</Text>

              <Text style={styles.cardValue}>
                {user.creditCard.invoices.length > 0
                  ? user.creditCard.invoices[0].invoiceAmount.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )
                  : "R$ 0,00"}
              </Text>

              <Text style={styles.exp}>
                Vencimento em{" "}
                {new Date(user.creditCard.invoiceDueDate).toLocaleDateString(
                  "pt-BR",
                  {
                    day: "2-digit",
                    month: "2-digit",
                  }
                )}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateCreditCard")}
          >
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              style={styles.card}
            >
              <CreditCardIcon size={40} color="#e0f2ff" />
              <Text style={[styles.invoice, { marginTop: 15 }]}>
                Peça agora seu cartão de crédito
              </Text>
              <Text style={styles.exp}>
                Aproveite limite, compras online e controle total que só a Orbit
                oferece!
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
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
