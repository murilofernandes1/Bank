import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import BackButton from "../../../../../components/BackButton";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import api from "services/api";
import LoadingScreen from "components/LoadingScreen";
import { phoneFormatter } from "utils/phoneFormatter";
import { TrashIcon } from "phosphor-react-native";

type KeyProps = {
  id: string;
  key: string;
  type: string;
};

export default function PixKey() {
  const [keys, setKeys] = useState<KeyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const cpfKey = keys.find((k) => k.type === "cpf");
  const emailKey = keys.find((k) => k.type === "email");
  const phoneKey = keys.find((k) => k.type === "phone");
  const randomKey = keys.find((k) => k.type === "random");

  async function loadKeys() {
    try {
      const response = await api.get("/me");
      setKeys(response.data.pixKeys || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteKey(id: string) {
    try {
      setDeletingId(id);
      await api.delete(`/me/keys/${id}`);
      setKeys((prev) => prev.filter((k) => k.id !== id));
      Alert.alert("Sucesso", "Chave Pix removida com sucesso.");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível remover esta chave.");
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    loadKeys();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Minhas chaves Pix</Text>
        <Text style={styles.subtitle}>Consulte e Cadastre suas chaves Pix</Text>

        <View style={styles.keyList}>
          <View style={styles.keyContainer}>
            {cpfKey ? (
              <>
                <View style={styles.keyCard}>
                  <Text style={styles.keyTitle}>CPF</Text>
                  <Text style={styles.keyDetail}>{cpfKey.key}</Text>
                </View>
                <TouchableOpacity
                  disabled={!!deletingId}
                  onPress={() => handleDeleteKey(cpfKey.id)}
                >
                  {deletingId === cpfKey.id ? (
                    <LoadingScreen />
                  ) : (
                    <TrashIcon
                      style={styles.delete}
                      size={30}
                      color="#0d1b2a"
                    />
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.keyCard}
                onPress={() =>
                  navigation.navigate("ChoosedKey", { type: "cpf" })
                }
              >
                <Text style={styles.keyTitle}>CPF</Text>
                <Text style={styles.keyDesc}>Use seu CPF como chave Pix</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.keyContainer}>
            {emailKey ? (
              <>
                <View style={styles.keyCard}>
                  <Text style={styles.keyTitle}>Email</Text>
                  <Text style={styles.keyDetail}>{emailKey.key}</Text>
                </View>
                <TouchableOpacity
                  disabled={!!deletingId}
                  onPress={() => handleDeleteKey(emailKey.id)}
                >
                  {deletingId === emailKey.id ? (
                    <LoadingScreen />
                  ) : (
                    <TrashIcon
                      style={styles.delete}
                      size={30}
                      color="#0d1b2a"
                    />
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.keyCard}
                onPress={() =>
                  navigation.navigate("ChoosedKey", { type: "email" })
                }
              >
                <Text style={styles.keyTitle}>E-mail</Text>
                <Text style={styles.keyDesc}>
                  Cadastre seu e-mail como chave
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.keyContainer}>
            {phoneKey ? (
              <>
                <View style={styles.keyCard}>
                  <Text style={styles.keyTitle}>Telefone</Text>
                  <Text style={styles.keyDetail}>
                    {phoneFormatter(phoneKey.key)}
                  </Text>
                </View>
                <TouchableOpacity
                  disabled={!!deletingId}
                  onPress={() => handleDeleteKey(phoneKey.id)}
                >
                  {deletingId === phoneKey.id ? (
                    <LoadingScreen />
                  ) : (
                    <TrashIcon
                      style={styles.delete}
                      size={30}
                      color="#0d1b2a"
                    />
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.keyCard}
                onPress={() =>
                  navigation.navigate("ChoosedKey", { type: "phone" })
                }
              >
                <Text style={styles.keyTitle}>Telefone</Text>
                <Text style={styles.keyDesc}>Use seu número de celular</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.keyContainer}>
            {randomKey ? (
              <>
                <View style={styles.keyCard}>
                  <Text style={styles.keyTitle}>Chave Aleatória</Text>
                  <Text style={styles.keyDetail}>{randomKey.key}</Text>
                </View>
                <TouchableOpacity
                  disabled={!!deletingId}
                  onPress={() => handleDeleteKey(randomKey.id)}
                >
                  {deletingId === randomKey.id ? (
                    <LoadingScreen />
                  ) : (
                    <TrashIcon
                      style={styles.delete}
                      size={30}
                      color="#0d1b2a"
                    />
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.keyCard}
                onPress={() =>
                  navigation.navigate("ChoosedKey", { type: "random" })
                }
              >
                <Text style={styles.keyTitle}>Chave Aleatória</Text>
                <Text style={styles.keyDesc}>Gerar uma chave aleatória</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
