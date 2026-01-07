import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import BackButton from "../../../../../components/BackButton";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState, useRef } from "react";
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  function renderKeyCard(
    type: string,
    keyObj: KeyProps | undefined,
    desc: string
  ) {
    return (
      <View style={styles.keyContainer}>
        {keyObj ? (
          <>
            <TouchableOpacity style={styles.keyCardGradient}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {type === "cpf"
                    ? "CPF"
                    : type === "email"
                    ? "Email"
                    : type === "phone"
                    ? "Telefone"
                    : "Aleatória"}
                </Text>
              </View>
              <Text style={styles.keyDetail}>
                {type === "phone" && keyObj.key.length === 11
                  ? phoneFormatter(keyObj.key)
                  : keyObj.key}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!!deletingId}
              onPress={() => handleDeleteKey(keyObj.id)}
              style={styles.deleteButton}
            >
              {deletingId === keyObj?.id ? (
                <LoadingScreen />
              ) : (
                <TrashIcon size={28} color="#fef2f2" />
              )}
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.keyCardEmpty}
            onPress={() => navigation.navigate("ChoosedKey", { type })}
          >
            <Text style={styles.keyTitle}>
              {type === "cpf"
                ? "CPF"
                : type === "email"
                ? "E-mail"
                : type === "phone"
                ? "Telefone"
                : "Chave Aleatória"}
            </Text>
            <Text style={styles.keyDesc}>{desc}</Text>
          </TouchableOpacity>
        )}
      </View>
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
        <Text style={styles.title}>Minhas chaves Pix</Text>
        <Text style={styles.subtitle}>Consulte e cadastre suas chaves Pix</Text>

        <View style={styles.keyList}>
          {renderKeyCard("cpf", cpfKey, "Use seu CPF como chave Pix")}
          {renderKeyCard("email", emailKey, "Cadastre seu e-mail como chave")}
          {renderKeyCard("phone", phoneKey, "Use seu número de celular")}
          {renderKeyCard("random", randomKey, "Gerar uma chave aleatória")}
        </View>
      </ScrollView>
    </View>
  );
}
