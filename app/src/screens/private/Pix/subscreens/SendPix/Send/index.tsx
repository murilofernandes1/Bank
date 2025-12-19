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
    const normalizedKey = normalizeKey(key);

    if (!normalizedKey) {
      setEmpty(true);
      setSearching(false);
      return;
    }

    setDestination(null);
    setNotFound(false);
    setEmpty(false);
    setOwnKey(false);
    setSearching(true);

    try {
      const response = await api.get(`/pix/find?key=${normalizedKey}`);

      const data = response.data;

      if (!data) {
        setEmpty(false);
        setOwnKey(false);
        setNotFound(true);
        setSearching(false);
        return;
      }

      setDestination(data);
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
        showsVerticalScrollIndicator={false}
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
            placeholder="Digite a chave pix de quem receberá..."
            placeholderTextColor="#0d1b2a"
          />
          <TouchableOpacity onPress={findKey}>
            <ArrowRightIcon size={40} color="#0d1b2a" />
          </TouchableOpacity>
        </View>
        {empty && <Text>O campo não pode estar vazio</Text>}
        <View style={styles.contacts}>
          {searching && <LoadingScreen />}
          {notFound && <Text>Chave pix não encontrada</Text>}
          {ownKey && (
            <Text>Você não pode realizar transferências para si mesmo.</Text>
          )}
          {destination && (
            <>
              <Text style={styles.contactsTitle}>Enviar para</Text>

              <LinearGradient
                colors={["#0d1b2a", "#1b263b", "#415a77"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardRecent}
              >
                <TouchableOpacity
                  onPress={() => {
                    setDestinationId(destination.user.id);
                    setDestinationName(destination.user.name);

                    navigation.navigate("PixValue");
                  }}
                >
                  <View style={styles.contactInfo}>
                    <Text style={styles.name}>{destination.user.name}</Text>

                    <Text style={styles.key}>
                      Chave:{" "}
                      <Text style={styles.keyName}>{destination.key}</Text>
                    </Text>

                    <Text style={styles.bank}>Orbit Bank</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
