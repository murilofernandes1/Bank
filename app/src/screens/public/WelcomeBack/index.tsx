import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import api from "services/api";
import { useAuth } from "hooks/useAuth";
import OrbitingSingle from "../../../components/Orbit";
import { useEffect, useState } from "react";
import LoadingScreen from "components/LoadingScreen";
import { SignOutIcon, FingerprintIcon } from "phosphor-react-native";
import { PinInput } from "../../../components/PinInput/index";

type UserProps = {
  name: string;
};

export default function WelcomeBack() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const { Logout, Login } = useAuth();
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/me");
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadUser();
  }, []);

  async function handleLogin(pinValue: string) {
    try {
      console.log(pinValue);
      setError(false);
      const response = await api.post("/auth/pin", { pin: pinValue });
      Login(response.data);
    } catch (error) {
      setPin("");
      setError(true);
      setLoading(false);
      console.log(error);
    }
  }

  if (loading) return <LoadingScreen />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0d1b2a" }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <LinearGradient
          colors={["#0d1b2a", "#1b263b", "#415a77"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <TouchableOpacity onPress={Logout} style={styles.exit}>
              <SignOutIcon size={30} color="#e0f2ff" />
            </TouchableOpacity>
            <View style={styles.logoWrapper}>
              <OrbitingSingle
                centerSize={150}
                orbitSize={30}
                orbitRadius={130}
                orbitDuration={400000000}
              />
            </View>

            <Text style={styles.bigTitle}>
              Bem-vindo de volta, {user.name.split(" ")[0]}!
            </Text>

            <Text style={styles.subtitle}>
              Digite seu PIN ou use sua impressão digital para entrar.
            </Text>

            <View style={styles.buttons}>
              <PinInput
                error={error}
                value={pin}
                onChange={(value) => {
                  setError(false);
                  setPin(value);

                  if (value.length === 4) {
                    setTimeout(() => {
                      handleLogin(value);
                    }, 300);
                  }
                }}
              />

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Esta funcionalidade estará disponivel em uma versão futura."
                  )
                }
                style={styles.primaryButton}
              >
                <FingerprintIcon size={80} color="#e0f2ff" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
