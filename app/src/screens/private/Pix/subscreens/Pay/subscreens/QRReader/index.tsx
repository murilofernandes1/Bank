import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Text, View, ActivityIndicator, Vibration } from "react-native";
import { CornersOutIcon } from "phosphor-react-native";
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
  const [error, setError] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const { setDestinationId, setAmount, setDestinationName } = useTransfer();

  function handleTransfer(data: string) {
    if (scanned) return;
    setScanned(true);
    Vibration.vibrate(200);

    try {
      const parsedData: TransferDataProps = JSON.parse(data);
      if (!parsedData.destinationId || !parsedData.amount) throw new Error();
      setError(false);
      setDestinationId(parsedData.destinationId);
      setDestinationName(parsedData.name);
      setAmount(Number(parsedData.amount));
      navigation.navigate("ConfirmPix");
    } catch {
      setError(true);
      setTimeout(() => setScanned(false), 2000);
    }
  }

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <BackButton />
        <Text style={styles.message}>
          Precisamos do acesso à câmera para continuar.
        </Text>
        <GlobalButton title="Permitir acesso" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={
          scanned ? undefined : ({ data }) => handleTransfer(data)
        }
      />
      <View style={styles.overlay} pointerEvents="none">
        <CornersOutIcon size={300} weight="thin" color="#e0f2ff" />
        <Text style={styles.helperText}>Aponte a câmera para o QR Code</Text>
        {error && (
          <Text style={styles.errorText}>
            QR Code inválido. Tente novamente.
          </Text>
        )}
      </View>
      {scanned && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#e0f2ff" />
          <Text style={styles.loadingText}>Lendo QR Code...</Text>
        </View>
      )}
    </View>
  );
}
