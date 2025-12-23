import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowRightIcon } from "phosphor-react-native";
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

  function normalizeKey(value: string) {
    return value.replace(/\D/g, "");
  }

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
      >
        <Text style={styles.title}>Quem vai receber a transferência?</Text>
        <Text style={styles.subtitle}>
          Digite a chave do destinatário e confira os dados antes de enviar o
          valor.
        </Text>

        <View style={styles.pixArea}>
          <TextInput
            value={key}
            onChangeText={setKey}
            style={styles.pixDestination}
            placeholder="Digite a chave do destinatário..."
            placeholderTextColor="#0d1b2a"
            returnKeyType="search"
            onSubmitEditing={findKey}
          />
          <TouchableOpacity onPress={findKey} disabled={searching}>
            <ArrowRightIcon size={40} color={searching ? "#ccc" : "#0d1b2a"} />
          </TouchableOpacity>
        </View>

        <View style={styles.contacts}>
          {searching && <LoadingScreen />}

          {!searching && empty && (
            <Text style={styles.feedback}>O campo não pode estar vazio</Text>
          )}
          {!searching && notFound && (
            <Text style={styles.feedback}>Chave pix não encontrada</Text>
          )}
          {!searching && ownKey && (
            <Text style={styles.feedback}>
              Você não pode realizar transferências para si mesmo.
            </Text>
          )}

          {!searching && destination && (
            <>
              <Text style={styles.contactsTitle}>Enviar para</Text>
              <TouchableOpacity
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
