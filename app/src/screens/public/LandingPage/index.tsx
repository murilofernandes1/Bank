import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OrbitingSingle from "../../../components/Orbit";

export default function LandingPage() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <LinearGradient
      colors={["#0d1b2a", "#1b263b", "#415a77"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.logoWrapper}>
        <View style={{ position: "relative" }}>
          <OrbitingSingle
            centerSize={150}
            orbitSize={30}
            orbitRadius={130}
            orbitDuration={400000000}
          />
        </View>
      </View>

      <Text style={styles.bigTitle}>Seu dinheiro, sua liberdade.</Text>
      <Text style={styles.subtitle}>
        Uma experiência bancária simples, moderna e feita para você.
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.secondaryButtonText}>
            Criar conta gratuitamente
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
