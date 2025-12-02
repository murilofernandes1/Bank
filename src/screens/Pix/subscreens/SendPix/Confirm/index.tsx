import { View, Text, ScrollView } from "react-native";
import BackButton from "../../../../../components/BackButton";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowDownIcon } from "phosphor-react-native";
import GradientButton from "../../../../../components/GlobalButton";
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
            colors={["#f0f7ff", "#cfe4ff", "#9fcaff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.card}
          >
            <Text style={styles.value}>R$ 0,10</Text>
            <Text style={styles.method}>Via saldo da conta</Text>
            <ArrowDownIcon style={styles.arrow} size={15} color="#0d1b2a" />

            <Text style={styles.name}>Kelverlyson Silva Santos</Text>
            <Text style={styles.bank}>Banco Nigger</Text>
          </LinearGradient>
          <View style={styles.send}>
            <GradientButton
              title="Enviar transferência"
              onPress={() => console.log("clicou")}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
