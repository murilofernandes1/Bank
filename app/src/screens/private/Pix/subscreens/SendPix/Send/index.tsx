import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowRightIcon, UserIcon } from "phosphor-react-native";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "../../../../../../components/BackButton";
import { styles } from "./styles";
import { useState } from "react";
import api from "services/api";
import LoadingScreen from "components/LoadingScreen";
import { useTransfer } from "../../../../../../hooks/useTransfer";
import { phoneFormatter } from "../../../../../../utils/phoneFormatter";

type DestinationProps = {
  key: string;
  user: UserProps;
};
type UserProps = {
  id: string;
  name: string;
};

export default function SendPix() {
  const { setDestinationId, setDestinationName } = useTransfer();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [key, setKey] = useState("");
  const [destination, setDestination] = useState<DestinationProps | null>(null);
  const [searching, setSearching] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [ownKey, setOwnKey] = useState(false);

  async function findKey() {
    if (!key.trim()) {
      setEmpty(true);
      setDestination(null);
      return;
    }

    const normalizedKey = key.includes("@")
      ? key.trim()
      : key.replace(/\D/g, "");

    setDestination(null);
    setNotFound(false);
    setEmpty(false);
    setOwnKey(false);
    setSearching(true);

    try {
      const response = await api.get(`/pix/find?key=${normalizedKey}`);

      if (!response.data) {
        setNotFound(true);
      } else {
        setDestination(response.data);
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        setOwnKey(true);
      } else {
        setNotFound(true);
      }
    } finally {
      setSearching(false);
    }
  }

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Quem vai receber?</Text>
        <Text style={styles.subtitle}>
          Informe a chave Pix do destinatário para continuar
        </Text>

        <View style={styles.searchCard}>
          <TextInput
            value={key}
            onChangeText={setKey}
            style={styles.pixDestination}
            placeholder="CPF, e-mail, telefone ou chave aleatória"
            placeholderTextColor="#64748b"
            returnKeyType="search"
            onSubmitEditing={findKey}
          />
          <TouchableOpacity
            onPress={findKey}
            disabled={searching}
            style={styles.searchButton}
          >
            <ArrowRightIcon size={28} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contacts}>
          {searching && <LoadingScreen />}

          {!searching && empty && (
            <Text style={styles.feedback}>Informe uma chave Pix válida</Text>
          )}

          {!searching && notFound && (
            <Text style={styles.feedback}>Chave Pix não encontrada</Text>
          )}

          {!searching && ownKey && (
            <Text style={styles.feedback}>
              Você não pode transferir para sua própria chave
            </Text>
          )}

          {!searching && destination && (
            <>
              <Text style={styles.contactsTitle}>Destinatário</Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setDestinationId(destination.user.id);
                  setDestinationName(destination.user.name);
                  navigation.navigate("PixValue");
                }}
              >
                <LinearGradient
                  colors={["#0d1b2a", "#1b263b", "#415a77"]}
                  style={styles.cardRecent}
                >
                  <View style={styles.avatar}>
                    <UserIcon size={26} color="#e0f2ff" />
                  </View>

                  <View style={styles.contactInfo}>
                    <Text style={styles.name}>{destination.user.name}</Text>

                    <Text style={styles.key}>
                      Chave:{" "}
                      <Text style={styles.keyName}>
                        {destination.key.length === 11
                          ? phoneFormatter(destination.key)
                          : destination.key}
                      </Text>
                    </Text>

                    <Text style={styles.bank}>Orbit Bank</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
