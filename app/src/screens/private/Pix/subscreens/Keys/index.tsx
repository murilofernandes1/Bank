import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import BackButton from "../../../../../components/BackButton";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import api from "services/api";
import LoadingScreen from "components/LoadingScreen";

type KeyProps = {
  id: string;
  key: string;
  type: string;
};

export default function PixKey() {
  const [keys, setKeys] = useState<KeyProps[] | null>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadKeys() {
      try {
        const response = await api.get("/me");
        setKeys(response.data.pixKeys);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadKeys();
  }, []);
  const cpfKey = keys.find((keys) => keys.type === "cpf");
  const emailKey = keys.find((keys) => keys.type === "email");
  const phoneKey = keys.find((keys) => keys.type === "phone");
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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
          {cpfKey ? (
            <>
              <View style={styles.keyCard}>
                <Text style={styles.keyTitle}>CPF</Text>
                <Text style={styles.keyDetail}>{cpfKey.key}</Text>
              </View>
            </>
          ) : (
            <TouchableOpacity
              style={styles.keyCard}
              onPress={() => navigation.navigate("ChoosedKey", { type: "cpf" })}
            >
              <Text style={styles.keyTitle}>CPF</Text>
              <Text style={styles.keyDesc}>Use seu CPF como chave Pix</Text>
            </TouchableOpacity>
          )}

          {emailKey ? (
            <>
              <View style={styles.keyCard}>
                <Text style={styles.keyTitle}>Email</Text>
                <Text style={styles.keyDetail}>{emailKey.key}</Text>
              </View>
            </>
          ) : (
            <TouchableOpacity
              style={styles.keyCard}
              onPress={() =>
                navigation.navigate("ChoosedKey", { type: "email" })
              }
            >
              <Text style={styles.keyTitle}>E-mail</Text>
              <Text style={styles.keyDesc}>Cadastre seu e-mail como chave</Text>
            </TouchableOpacity>
          )}

          {phoneKey ? (
            <>
              <View style={styles.keyCard}>
                <Text style={styles.keyTitle}>Telefone</Text>
                <Text style={styles.keyDetail}>{phoneKey.key}</Text>
              </View>
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

          <TouchableOpacity
            style={styles.keyCard}
            onPress={() =>
              navigation.navigate("ChoosedKey", { type: "random" })
            }
          >
            <Text style={styles.keyTitle}>Chave Aleatória</Text>
            <Text style={styles.keyDesc}>Gerar uma chave aleatória</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
