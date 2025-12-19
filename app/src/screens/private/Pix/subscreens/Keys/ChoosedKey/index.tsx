import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BackButton from "../../../../../../components/BackButton";
import { styles } from "./styles";
import api from "services/api";
import { useState } from "react";
import { MaskedTextInput } from "react-native-mask-text";
import LoadingAction from "components/LoadingAction";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function ChoosedKey({ route }: any) {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const { type } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  function normalizeNumber(input: string) {
    return input.replace(/\D/g, "");
  }

  async function newKey() {
    setLoading(true);
    setError(false);
    setMessage(false);

    try {
      let keyToSend = key;

      if (type === "cpf" || type === "phone") {
        keyToSend = normalizeNumber(key);
      }

      await api.post("/me/keys", {
        type,
        key: keyToSend,
      });

      setLoading(false);
      setMessage(true);

      setTimeout(() => {
        navigation.replace("PixKeys");
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }

  if (loading || message || error) {
    return (
      <LoadingAction
        loading={loading}
        message={message}
        error={error}
        actionMessage="Chave cadastrada com sucesso!"
      />
    );
  }

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Cadastrar chave</Text>
        <Text style={styles.subtitle}>
          {type === "cpf" && "Digite seu CPF para cadastrar"}
          {type === "email" && "Digite seu e-mail"}
          {type === "phone" && "Digite seu número de telefone"}
          {type === "random" && "Gerar chave aleatória"}
        </Text>

        {type === "cpf" && (
          <MaskedTextInput
            value={key}
            onChangeText={setKey}
            style={styles.input}
            mask="999.999.999-99"
            placeholder="000.000.000-00"
            placeholderTextColor="#8c9bab"
            keyboardType="numeric"
          />
        )}

        {type === "phone" && (
          <MaskedTextInput
            value={key}
            onChangeText={setKey}
            style={styles.input}
            mask="(99) 99999-9999"
            placeholder="(__) _____-____"
            placeholderTextColor="#8c9bab"
            keyboardType="phone-pad"
          />
        )}

        {type === "email" && (
          <TextInput
            value={key}
            onChangeText={setKey}
            style={styles.input}
            placeholder="exemplo@email.com"
            placeholderTextColor="#8c9bab"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}

        {type === "random" && (
          <View style={styles.randomBox}>
            <Text style={styles.randomText}>
              Uma chave aleatória será gerada automaticamente.
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={newKey} style={styles.confirmButton}>
          <Text style={styles.confirmText}>Salvar chave</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
