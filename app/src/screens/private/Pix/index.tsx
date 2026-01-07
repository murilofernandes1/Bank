import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  KeyIcon,
  BarcodeIcon,
  LightningIcon,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Pix() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Área Pix</Text>
        <Text style={styles.subtitle}>
          Envie pagamentos instantâneos a qualquer hora do dia, fácil e prático.
        </Text>

        <View style={styles.heroCard}>
          <LinearGradient
            colors={["#0d1b2a", "#1b263b"]}
            style={styles.heroGradient}
          >
            <LightningIcon size={26} color="#e0f2ff" />
            <Text style={styles.heroTitle}>Pix instantâneo</Text>
            <Text style={styles.heroSubtitle}>
              Transferências em segundos, 24h por dia.
            </Text>
          </LinearGradient>
        </View>

        <Text style={styles.section}>Serviços</Text>

        <View style={styles.servicesGrid}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SendPix")}
            style={styles.serviceButton}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              style={styles.serviceCircle}
            >
              <ArrowUpIcon size={36} color="#e0f2ff" />
            </LinearGradient>
            <Text style={styles.serviceName}>Enviar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ReceiveValue")}
            style={styles.serviceButton}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              style={styles.serviceCircle}
            >
              <ArrowDownIcon size={36} color="#e0f2ff" />
            </LinearGradient>
            <Text style={styles.serviceName}>Receber</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("PayPix")}
            style={styles.serviceButton}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              style={styles.serviceCircle}
            >
              <BarcodeIcon size={36} color="#e0f2ff" />
            </LinearGradient>
            <Text style={styles.serviceName}>Pagar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("PixKeys")}
            style={styles.serviceButton}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#0d1b2a", "#1b263b", "#415a77"]}
              style={styles.serviceCircle}
            >
              <KeyIcon size={36} color="#e0f2ff" />
            </LinearGradient>
            <Text style={styles.serviceName}>Chaves Pix</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
