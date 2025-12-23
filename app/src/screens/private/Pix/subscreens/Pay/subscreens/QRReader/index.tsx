import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Text, View, Alert } from "react-native";
import LoadingAction from "components/LoadingAction";
import { CornersOutIcon, ScanIcon } from "phosphor-react-native";
import BackButton from "components/BackButton";
import GlobalButton from "components/GlobalButton";
import { styles } from "./styles";
import { useTransfer } from "hooks/useTransfer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type TransferDataProps = {
  destinationId: string;
  name: string;
  amount: number;
};

export default function QRReader() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const { setDestinationId, setAmount, setDestinationName } = useTransfer();

  async function handleTransfer(data: string) {
    if (scanned) return;
    setScanned(true);

    try {
      const parsedData: TransferDataProps = JSON.parse(data);
      console.log(parsedData);
      if (!parsedData.destinationId || !parsedData.amount) {
        throw new Error("Dados incompletos");
      }

      const parsedAmount = Number(parsedData.amount);
      setAmount(parsedAmount);
      setDestinationId(parsedData.destinationId);
      setDestinationName(parsedData.name);
      navigation.navigate("ConfirmPix");
    } catch (err) {
      setScanned(false);
      Alert.alert("Erro", "QR Code inválido ou expirado.");
      console.log("Erro no parse ou transferência", err);
    }
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <>
        <BackButton />

        <View style={styles.container}>
          <Text style={styles.message}>
            Precisamos do acesso a sua câmera para ler os QR Codes.
          </Text>

          <GlobalButton onPress={requestPermission} title="Permitir" />
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />

      <CameraView
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={
          scanned ? undefined : ({ data }) => handleTransfer(data)
        }
        style={styles.camera}
      />

      <View style={styles.portrait} pointerEvents="none">
        <CornersOutIcon size={300} weight="thin" color="#e0f2ff" />
      </View>
    </View>
  );
}
