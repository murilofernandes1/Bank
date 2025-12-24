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
import { useTransfer } from "../../../../../../hooks/useTransfer";

export default function ConfirmPix() {
  const { destinationId, amount, destinationName, SendTransfer } =
    useTransfer();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  async function handleTransfer() {
    try {
      setSending(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setMessage(true);
        setTimeout(() => {
          SendTransfer(destinationId, amount);
          navigation.replace("Home");
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
          <Text style={styles.title}>Você vai enviar</Text>
          <LinearGradient
            colors={["#0d1b2a", "#1b263b", "#415a77"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.value}>
              {amount && amount > 0
                ? amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  })
                : "R$ 0,00"}
            </Text>
            {/* <Text style={styles.method}>Via {methodName}</Text> */}
            <ArrowDownIcon style={styles.arrow} size={15} color="#f0f7ff" />

            <Text style={styles.name}>{destinationName}</Text>
            <Text style={styles.bank}>Orbit Bank</Text>
          </LinearGradient>

          <GradientButton
            title="Enviar transferência"
            onPress={handleTransfer}
          />
        </ScrollView>
        {sending && (
          <LoadingAction
            loading={loading}
            actionMessage="Pix enviado com sucesso! 
            Você pode consultar o comprovante na tela de extrato."
            error={error}
            message={message}
          />
        )}
      </View>
    </>
  );
}
