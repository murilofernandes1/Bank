import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { QrCodeIcon, PencilSimpleIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from "./styles";

export default function PayPix() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleScanQRCode = () => {
    Alert.alert(
      "Escanear QR Code",
      "Aqui a câmera será aberta para escanear o QR Code."
    );
  };

  const handleInsertKey = () => {
    navigation.navigate("SendPix");
  };

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Como deseja pagar?</Text>
        <Text style={styles.subtitle}>
          Escolha a maneira desejada para pagar.
        </Text>

        <TouchableOpacity style={styles.optionCard} onPress={handleScanQRCode}>
          <LinearGradient
            colors={["#0d1b2a", "#1b263b", "#415a77"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.optionGradient}
          >
            <QrCodeIcon size={40} color="#e0f2ff" />
            <Text style={styles.optionText}>Escanear QR Code</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard} onPress={handleInsertKey}>
          <LinearGradient
            colors={["#0d1b2a", "#1b263b", "#415a77"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.optionGradient}
          >
            <PencilSimpleIcon size={40} color="#e0f2ff" />
            <Text style={styles.optionText}>Inserir chave manualmente</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
