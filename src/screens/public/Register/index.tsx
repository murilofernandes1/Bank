import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaskedTextInput } from "react-native-mask-text";
import { useState } from "react";
import api from "services/api";
import { styles } from "./styles";
import { useAuth } from "../../../hooks/useAuth";

export default function RegisterScreen() {
  const { Login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [formError, setFormError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setFormError(false);
    setPasswordMismatch(false);
    setError(false);
    setFormError(false);
    try {
      if (!email || !password || !name || !cpf) {
        return setFormError(true);
      }
      if (password !== confirmPassword) {
        return setPasswordMismatch(true);
      }

      const response = await api.post("/auth/register", {
        name: name,
        email: email,
        password: password,
        cpf: cpf,
      });

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
      {loading ? (
        <ActivityIndicator />
      ) : (
        <LinearGradient
          colors={["#0d1b2a", "#1b263b", "#415a77"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>
              Abra sua conta em poucos minutos
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#e0f2ff90"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#e0f2ff90"
            />

            <MaskedTextInput
              mask="999.999.999-99"
              placeholder="CPF"
              placeholderTextColor="#e0f2ff90"
              style={styles.input}
              value={cpf}
              onChangeText={setCpf}
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              placeholderTextColor="#e0f2ff90"
            />

            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              secureTextEntry
              placeholderTextColor="#e0f2ff90"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
            {passwordMismatch && (
              <Text style={styles.error}>As senhas não coincidem</Text>
            )}

            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
              <Text style={styles.buttonText}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}
    </>
  );
}
