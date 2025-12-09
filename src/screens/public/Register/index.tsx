import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <LinearGradient
      colors={["#0d1b2a", "#1b263b", "#415a77"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Abra sua conta em poucos minutos</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#e0f2ff90"
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#e0f2ff90"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor="#e0f2ff90"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          secureTextEntry
          placeholderTextColor="#e0f2ff90"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
