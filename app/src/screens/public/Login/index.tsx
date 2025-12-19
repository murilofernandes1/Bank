import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import BackButton from "../../../components/BackButton";
import { useAuth } from "../../../hooks/useAuth";
import api from "services/api";
import LoadingScreen from "components/LoadingScreen";

export default function LoginScreen() {
  const { Login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleLogin() {
    try {
      if (!email || !password) {
        return setFormError(true);
      }
      setLoading(true);
      setFormError(false);
      setError(false);
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      console.log(response.data);
      setFormError(false);
      setError(false);
      setLoading(false);
      Login(response.data);
    } catch (error) {
      setFormError(false);
      setError(true);
      console.log(error);
    }
  }
  return (
    <>
      {loading === true ? (
        <LoadingScreen />
      ) : (
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
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Senha"
              placeholderTextColor="#e0f2ff90"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            {formError && (
              <Text style={styles.error}>Os campos não podem estar vazios</Text>
            )}
            {error && (
              <Text style={styles.error}>
                Dados inválidos. Verifique os campos digitados e tente
                novamente.
              </Text>
            )}
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}
    </>
  );
}
