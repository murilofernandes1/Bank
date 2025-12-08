import { View, Text, ScrollView } from "react-native";
import BackButton from "../../../../../../components/BackButton";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowDownIcon } from "phosphor-react-native";
import GradientButton from "../../../../../../components/GlobalButton";
import LoadingAction from "../../../../../../components/LoadingAction";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function ConfirmPix() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  async function fakeLoading() {
    try {
      setSending(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setMessage(true);
        setTimeout(() => {
          navigation.navigate("Pix");
        }, 3000);
      }, 3000);
    } catch (error) {
      setError(true);
    }
  }
  return (
    <>
      <View style={styles.screen}>
        <BackButton />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>Você vai enviar</Text>
          <LinearGradient
            colors={["#0d1b2a", "#1b263b", "#415a77"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.value}>R$ 0,10</Text>
            <Text style={styles.method}>Via saldo da conta</Text>
            <ArrowDownIcon style={styles.arrow} size={15} color="#f0f7ff" />

            <Text style={styles.name}>Kelverlyson Silva Santos</Text>
            <Text style={styles.bank}>Banco Nigger</Text>
          </LinearGradient>

          <GradientButton title="Enviar transferência" onPress={fakeLoading} />
        </ScrollView>
        {sending && (
          <LoadingAction
            loading={loading}
            actionMessage="Pix enviado com sucesso!"
            error={error}
            message={message}
          />
        )}
      </View>
    </>
  );
}
