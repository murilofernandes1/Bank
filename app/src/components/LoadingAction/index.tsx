import { LinearGradient } from "expo-linear-gradient";
import { Animated, View } from "react-native";
import { useEffect, useRef } from "react";
import { CheckCircle } from "phosphor-react-native";
import { styles } from "./styles";

//AN TEMPLATE FOR GLOBAL USE CASES, BY NOW, WITH A FAKE LOADING TIMEOUT SIMULATOR

// const navigation = useNavigation<NativeStackNavigationProp<any>>();
//   const [sending, setSending] = useState(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [message, setMessage] = useState(false);
//   const [error, setError] = useState(false);
//   async function fakeLoading() {
//     try {
//       setSending(true);
//       setLoading(true);
//       setTimeout(() => {
//         setLoading(false);
//         setMessage(true);
//         setTimeout(() => {
//           navigation.navigate("Pix");
//         }, 3000);
//       }, 3000);
//     } catch (error) {
//       setError(true);
//     }
//   }

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

  const iconStyle = {
    opacity: fadeAnim,
    transform: [{ translateX: slideAnim }],
  };

  return (
    <LinearGradient
      colors={["#0d1b2a", "#1b263b", "#415a77"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {loading && (
        <View style={styles.messageWrapper}>
          <Animated.Text style={styles.message}>Só um momento...</Animated.Text>
        </View>
      )}

      {message && (
        <View style={styles.messageWrapper}>
          <Animated.View style={iconStyle}>
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
            Algo deu errado. Tente novamente mais tarde.
          </Animated.Text>
        </View>
      )}
    </LinearGradient>
  );
}
