import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowsLeftRightIcon,
  ReceiptIcon,
  BarcodeIcon,
  ChartLineUpIcon,
} from "phosphor-react-native";

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
        {/*SESSÃO DE HEADER*/}
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

        {/*SESSÃO DE SALDO DO USUARIO*/}
        <LinearGradient
          colors={["#f0f7ff", "#cfe4ff", "#9fcaff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.balance}
        >
          <View style={styles.balanceContainer}>
            <Text style={styles.title}>Saldo atual</Text>
            <Text style={styles.number}>
              {hideBalance ? "R$ ••••" : "R$ 1.000,00"}
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

        {/*SESSÃO DE SERVIÇOS*/}
        <Text style={styles.section}>Serviços</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.services}
        >
          <TouchableOpacity style={styles.serviceButton}>
            <LinearGradient
              colors={["#f0f7ff", "#d6eaff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceCircle}
            >
              <Image
                source={require("../../assets/pixLogo.png")}
                style={styles.pixIcon}
                resizeMode="contain"
              />
            </LinearGradient>
            <Text style={styles.serviceName}>Área Pix</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton}>
            <LinearGradient
              colors={["#f0f7ff", "#d6eaff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceCircle}
            >
              <BarcodeIcon size={40} color="#0d1b2a" />
            </LinearGradient>
            <Text style={styles.serviceName}>Pagar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton}>
            <LinearGradient
              colors={["#f0f7ff", "#d6eaff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceCircle}
            >
              <ReceiptIcon size={40} color="#0d1b2a" />
            </LinearGradient>
            <Text style={styles.serviceName}>Extrato</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton}>
            <LinearGradient
              colors={["#f0f7ff", "#d6eaff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceCircle}
            >
              <ChartLineUpIcon size={40} color="#0d1b2a" />
            </LinearGradient>
            <Text style={styles.serviceName}>Investimentos</Text>
          </TouchableOpacity>
        </ScrollView>

        {/*SESSÃO DE PAGAMENTOS PENDENTES*/}
        <Text style={styles.section}>Pagamentos pendentes</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pendents}
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

        {/*SESSÃO DE TRANSAÇÕES RECENTES */}
        <Text style={styles.section}>Transações recentes</Text>

        <View style={styles.recentTransactions}>
          {[1, 2].map((i) => (
            <LinearGradient
              key={i}
              colors={["#f0f7ff", "#cfe4ff", "#9fcaff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cardRecent}
            >
              <ArrowsLeftRightIcon size={32} color="#000" weight="bold" />

              <View style={{ flex: 1 }}>
                <Text style={styles.titleTransaction}>
                  {i === 1 ? "Pix para Fulano" : "Pix de Ciclano"}
                </Text>
              </View>

              <Text style={i === 1 ? styles.exitValue : styles.entryValue}>
                {i === 1 ? "-R$ 10,00" : "+R$ 10,00"}
              </Text>
            </LinearGradient>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
