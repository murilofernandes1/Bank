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
import { PinInput } from "../../../components/PinInput";

export default function RegisterScreen() {
  const { Login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [pin, setPin] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [formError, setFormError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pinStage, setPinStage] = useState(false);

  async function handleRegister() {
    setFormError(false);
    setPasswordMismatch(false);
    setError(false);
    if (!email || !password || !name || !cpf) {
      return setFormError(true);
    }
    if (password !== confirmPassword) {
      return setPasswordMismatch(true);
    }
    setPinStage(true);
  }
  async function handleCreateAccount() {
    try {
      setLoading(true);
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        cpf,
        pin,
      });

      Login(response.data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
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
            {!pinStage ? (
              <>
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
                  <Text style={styles.error}>
                    Os campos não podem estar vazios
                  </Text>
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

                <TouchableOpacity
                  onPress={handleRegister}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Próximo</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.pin}>
                  <Text style={styles.title}>Crie seu PIN</Text>
                  <Text style={styles.subtitle}>
                    Crie um PIN de 4 digitos. O PIN será usado para entrar e
                    autorizar as demais transações no aplicativo.
                  </Text>

                  <PinInput
                    value={pin}
                    error={error}
                    onChange={(value) => {
                      setPin(value);
                      if (value.length === 4) {
                        setTimeout(() => {
                          handleCreateAccount();
                        }, 300);
                      }
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </LinearGradient>
      )}
    </>
  );
}
