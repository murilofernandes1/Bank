import { View, Text, ScrollView } from "react-native";
import BackButton from "../../../../../../components/BackButton";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowDownIcon } from "phosphor-react-native";
import GradientButton from "../../../../../../components/GlobalButton";
export default function ConfirmPix() {
  return (
    <>
      <View style={styles.screen}>
        <BackButton />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>Você vai enviar</Text>
          <LinearGradient
            colors={["#0d1b2a", "#1b263b", "#415a77"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.value}>R$ 0,10</Text>
            <Text style={styles.method}>Via saldo da conta</Text>
            <ArrowDownIcon style={styles.arrow} size={15} color="#f0f7ff" />

            <Text style={styles.name}>Kelverlyson Silva Santos</Text>
            <Text style={styles.bank}>Banco Nigger</Text>
          </LinearGradient>

          <GradientButton
            title="Enviar transferência"
            onPress={() => console.log("clicou")}
          />
        </ScrollView>
      </View>
    </>
  );
}
