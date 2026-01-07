import { LinearGradient } from "expo-linear-gradient";
import { Animated, View, Modal, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { CheckCircle } from "phosphor-react-native";
import { styles } from "./styles";

type LoadingActionProps = {
  loading: boolean;
  message: boolean;
  actionMessage: string;
  error: boolean;
};

export default function LoadingAction({
  loading,
  actionMessage,
  error,
  message,
}: LoadingActionProps) {
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  const visible = loading || message || error;

  useEffect(() => {
    if (loading) {
      rotateAnim.setValue(0);
      loopRef.current = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      loopRef.current.start();
    } else {
      loopRef.current?.stop();
    }

    return () => {
      loopRef.current?.stop();
    };
  }, [loading]);

  useEffect(() => {
    if (message && !error) {
      slideAnim.setValue(-20);
      fadeAnim.setValue(0);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [message, error]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <LinearGradient
        colors={["#0d1b2a", "#1b263b", "#415a77"]}
        style={styles.container}
      >
        {loading && (
          <View style={styles.messageWrapper}>
            <Animated.View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                borderWidth: 4,
                borderColor: "#e0f2ff",
                borderTopColor: "transparent",
                transform: [{ rotate: spin }],
              }}
            />
          </View>
        )}

        {message && (
          <View style={styles.messageWrapper}>
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }],
              }}
            >
              <CheckCircle size={52} weight="fill" color="#e0f2ff" />
            </Animated.View>

            <Animated.Text style={[styles.message, { opacity: fadeAnim }]}>
              {actionMessage}
            </Animated.Text>
          </View>
        )}

        {error && (
          <View style={styles.messageWrapper}>
            <Animated.Text style={styles.message}>
              Ops! Algo deu errado, tente novamente mais tarde.
            </Animated.Text>
          </View>
        )}
      </LinearGradient>
    </Modal>
  );
}
