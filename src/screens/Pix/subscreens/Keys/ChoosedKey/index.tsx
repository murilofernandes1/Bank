import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BackButton from "../../../../../components/BackButton";
import { styles } from "./styles";

export default function ChoosedKey({ route }: any) {
  const { type } = route.params;

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Cadastrar chave</Text>
        <Text style={styles.subtitle}>
          {type === "cpf" && "Digite seu CPF para cadastrar"}
          {type === "email" && "Digite seu e-mail"}
          {type === "phone" && "Digite seu número de telefone"}
          {type === "random" && "Gerar chave aleatória"}
        </Text>

        {type !== "random" && (
          <TextInput
            style={styles.input}
            placeholder={
              type === "cpf"
                ? "000.000.000-00"
                : type === "email"
                ? "exemplo@email.com"
                : "(__) _____-____"
            }
            placeholderTextColor="#8c9bab"
            keyboardType={type === "email" ? "default" : "numeric"}
          />
        )}

        {type === "random" && (
          <View style={styles.randomBox}>
            <Text style={styles.randomText}>
              Uma chave aleatória será gerada automaticamente.
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmText}>Salvar chave</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
