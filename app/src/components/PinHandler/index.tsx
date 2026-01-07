import {
  View,
  Text,
  Modal,
  Pressable,
  Vibration,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import { PinInput } from "../PinInput";
import { useTransfer } from "hooks/useTransfer";

interface PinCheckerProps {
  isOpen: boolean;
  onSuccess: (pin: string) => void | Promise<void>;
  onCancel?: () => void;
}

export default function PinChecker({
  isOpen,
  onSuccess,
  onCancel,
}: PinCheckerProps) {
  const { CheckPin } = useTransfer();

  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading) return;

    rotate.setValue(0);
    const loop = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      })
    );

    loop.start();

    return () => loop.stop();
  }, [loading]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  async function handleCheckPin(value: string) {
    try {
      setLoading(true);
      setError(false);

      const isValid = await CheckPin(value);

      if (!isValid) {
        setPin("");
        setError(true);
        Vibration.vibrate(300);
        return;
      }

      setPin("");
      await onSuccess(value);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    if (loading) return;
    setPin("");
    setError(false);
    onCancel?.();
  }

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <Pressable style={styles.backdrop} onPress={handleCancel}>
        <Pressable style={styles.modal} onPress={() => {}}>
          <LinearGradient
            colors={["#0d1b2a", "#1b263b", "#415a77"]}
            style={styles.content}
          >
            {!loading ? (
              <>
                <Text style={styles.title}>Insira seu PIN</Text>

                <Text style={styles.subtitle}>
                  Confirme sua identidade para continuar
                </Text>

                <PinInput
                  error={error}
                  value={pin}
                  onChange={(value) => {
                    setError(false);
                    setPin(value);

                    if (value.length === 4) {
                      setTimeout(() => {
                        handleCheckPin(value);
                      }, 300);
                    }
                  }}
                />
              </>
            ) : (
              <View style={styles.loadingWrapper}>
                <View style={styles.loadingCenter} />

                <Animated.View
                  style={[
                    styles.loadingOrbit,
                    { transform: [{ rotate: spin }] },
                  ]}
                >
                  <View style={styles.loadingDot} />
                </Animated.View>
              </View>
            )}
          </LinearGradient>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
