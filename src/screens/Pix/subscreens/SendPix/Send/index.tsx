import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowRightIcon } from "phosphor-react-native";
import { LinearGradient } from "expo-linear-gradient";

import BackButton from "../../../../../components/BackButton";
import { styles } from "./styles";

export default function SendPix() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Quem vai receber a transferência?</Text>

        <View style={styles.pixArea}>
          <TextInput
            style={styles.pixDestination}
            placeholder="Digite a chave pix de quem receberá..."
            placeholderTextColor="#0d1b2a"
          />
          <TouchableOpacity onPress={() => navigation.navigate("PixValue")}>
            <ArrowRightIcon size={40} color="#0d1b2a" />
          </TouchableOpacity>
        </View>

        <View style={styles.contacts}>
          <Text style={styles.subHeader}>Contatos frequentes</Text>

          <LinearGradient
            colors={["#0d1b2a", "#1b263b", "#415a77"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardRecent}
          >
            <TouchableOpacity>
              <View style={styles.contactInfo}>
                <Text style={styles.name}>Kelverlyson da Silva Santos</Text>

                <Text style={styles.key}>
                  Chave: <Text style={styles.keyName}>123.456.789-10</Text>
                </Text>

                <Text style={styles.bank}>Banco Nigger</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}
