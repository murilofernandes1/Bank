import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import BackButton from "../../../../../components/BackButton";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function PixKey() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Cadastrar chave Pix</Text>
        <Text style={styles.subtitle}>
          Escolha o tipo de chave que deseja registrar
        </Text>

        <View style={styles.keyList}>
          <TouchableOpacity
            style={styles.keyCard}
            onPress={() => navigation.navigate("ChoosedKey", { type: "cpf" })}
          >
            <Text style={styles.keyTitle}>CPF</Text>
            <Text style={styles.keyDesc}>Use seu CPF como chave Pix</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.keyCard}
            onPress={() => navigation.navigate("ChoosedKey", { type: "email" })}
          >
            <Text style={styles.keyTitle}>E-mail</Text>
            <Text style={styles.keyDesc}>Cadastre seu e-mail como chave</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.keyCard}
            onPress={() => navigation.navigate("ChoosedKey", { type: "phone" })}
          >
            <Text style={styles.keyTitle}>Telefone</Text>
            <Text style={styles.keyDesc}>Use seu número de celular</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.keyCard}
            onPress={() =>
              navigation.navigate("ChoosedKey", { type: "random" })
            }
          >
            <Text style={styles.keyTitle}>Chave Aleatória</Text>
            <Text style={styles.keyDesc}>Gerar uma chave aleatória</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
