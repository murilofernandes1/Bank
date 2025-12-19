import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowUpIcon, ArrowDownIcon, KeyIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Pix() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <>
      <View style={styles.screen}>
        <BackButton />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Área Pix</Text>
          <Text style={styles.subtitle}>
            Envie pagamentos instantâneos a qualquer hora do dia, fácil e
            prático.
          </Text>
          <View style={styles.services}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SendPix")}
              style={styles.serviceButton}
            >
              <LinearGradient
                colors={["#0d1b2a", "#1b263b", "#415a77"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.serviceCircle}
              >
                <ArrowUpIcon size={40} color="#e0f2ff" />
              </LinearGradient>
              <Text style={styles.serviceName}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ReceiveValue")}
              style={styles.serviceButton}
            >
              <LinearGradient
                colors={["#0d1b2a", "#1b263b", "#415a77"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.serviceCircle}
              >
                <ArrowDownIcon size={40} color="#e0f2ff" />
              </LinearGradient>
              <Text style={styles.serviceName}>Receber</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("PixKeys")}
              style={styles.serviceButton}
            >
              <LinearGradient
                colors={["#0d1b2a", "#1b263b", "#415a77"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.serviceCircle}
              >
                <KeyIcon size={40} color="#e0f2ff" />
              </LinearGradient>
              <Text style={styles.serviceName}>Chaves Pix</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
