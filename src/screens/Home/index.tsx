import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowsLeftRightIcon } from "phosphor-react-native";

import { styles } from "./styles";
import { useState } from "react";

export default function Home() {
  const [hideBalance, setHideBalance] = useState(true);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.top}>
          <View style={styles.header}>
            <Text style={styles.greeting}>
              Olá, <Text style={styles.name}>Murilo!</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.notifications}>
            <Feather name="bell" size={30} color="#0d1b2a" />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={["#f0f7ff", "#cfe4ff", "#9fcaff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.balance}
        >
          <View style={styles.balanceContainer}>
            <Text style={styles.title}>Saldo atual</Text>
            <Text style={styles.number}>
              {hideBalance ? "R$ ••••" : "R$1.000,00"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.eye}
            onPress={() => setHideBalance(!hideBalance)}
          >
            <Feather
              name={hideBalance ? "eye" : "eye-off"}
              size={30}
              color="#0d1b2a"
            />
          </TouchableOpacity>
        </LinearGradient>

        <Text style={styles.section}>Pagamentos pendentes</Text>

        <ScrollView
          style={styles.pendents}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {[1, 2, 3].map((i) => (
            <LinearGradient
              key={i}
              colors={["#f0f7ff", "#d6eaff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            />
          ))}
        </ScrollView>

        <Text style={styles.section}>Transações recentes</Text>
        <View style={styles.recentTransactions}>
          <LinearGradient
            colors={["#f0f7ff", "#cfe4ff", "#9fcaff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardRecent}
          >
            <ArrowsLeftRightIcon size={32} color="#000" weight="bold" />
            <Text style={styles.titleTransaction}>Pix para Fulano</Text>
            <Text style={styles.exitValue}>-R$ 10,00</Text>
          </LinearGradient>
          <LinearGradient
            colors={["#f0f7ff", "#cfe4ff", "#9fcaff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardRecent}
          >
            <ArrowsLeftRightIcon size={32} color="#000" weight="bold" />
            <Text style={styles.titleTransaction}>Pix de Ciclano</Text>
            <Text style={styles.entryValue}>+R$ 10,00</Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}
