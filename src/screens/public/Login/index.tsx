import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import BackButton from "../../../components/BackButton";

export default function LoginScreen() {
  return (
    <LinearGradient
      colors={["#0d1b2a", "#1b263b", "#415a77"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <BackButton />
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#e0f2ff90"
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#e0f2ff90"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
