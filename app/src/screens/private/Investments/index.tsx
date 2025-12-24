import BackButton from "../../../components/BackButton";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { PlusIcon, PiggyBankIcon } from "phosphor-react-native";
import LoadingScreen from "components/LoadingScreen";
import GlobalButton from "components/GlobalButton";
import api from "services/api";

type PiggyProps = {
  id: string;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
};

export default function Investments() {
  const [piggy, setPiggy] = useState<PiggyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPiggy, setSelectedPiggy] = useState<PiggyProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function loadPiggys() {
      const response = await api.get("/me/savings");
      setPiggy(response.data);
      setLoading(false);
    }
    loadPiggys();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const progress =
    selectedPiggy && selectedPiggy.targetAmount > 0
      ? Math.min(
          (selectedPiggy.currentAmount / selectedPiggy.targetAmount) * 100,
          100
        )
      : 0;

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Investimentos</Text>
        <Text style={styles.subtitle}>
          Invista seu dinheiro no banco que mais rende no Brasil!
        </Text>

        <Text style={styles.section}>Meus porquinhos</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {piggy.map((p) => {
            const remaining = p.targetAmount - p.currentAmount;

            return (
              <TouchableOpacity
                key={p.id}
                style={styles.piggyCard}
                onPress={() => {
                  setSelectedPiggy(p);
                  setModalVisible(true);
                }}
              >
                <LinearGradient
                  colors={["#0d1b2a", "#1b263b", "#415a77"]}
                  style={styles.piggyCircle}
                >
                  <PiggyBankIcon size={34} color="#e0f2ff" />
                </LinearGradient>

                <Text style={styles.piggyTitle}>{p.goalName}</Text>

                <Text style={styles.piggyValue}>
                  {p.currentAmount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>

                <Text style={styles.piggyRemaining}>
                  Faltam{" "}
                  {remaining.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity style={[styles.piggyCard, styles.createCard]}>
            <LinearGradient
              colors={["#1b263b", "#415a77"]}
              style={styles.piggyCircle}
            >
              <PlusIcon size={34} color="#e0f2ff" />
            </LinearGradient>

            <Text style={styles.piggyTitle}>Novo porquinho</Text>
            <Text style={styles.piggySubtitle}>Criar objetivo</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        />

        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />

          {selectedPiggy && (
            <>
              <LinearGradient
                colors={["#0d1b2a", "#1b263b", "#415a77"]}
                style={styles.modalCircle}
              >
                <PiggyBankIcon size={38} color="#e0f2ff" />
              </LinearGradient>

              <Text style={styles.modalTitle}>{selectedPiggy.goalName}</Text>

              <Text style={styles.modalMainValue}>
                {selectedPiggy.currentAmount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>

              <View style={styles.progressWrapper}>
                <View style={styles.progressBackground}>
                  <LinearGradient
                    colors={["#0d1b2a", "#415a77"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressFill, { width: `${progress}%` }]}
                  />
                </View>

                <Text style={styles.progressText}>
                  Faltam{" "}
                  {(
                    selectedPiggy.targetAmount - selectedPiggy.currentAmount
                  ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </View>

              <GlobalButton title="Adicionar dinheiro" onPress={() => {}} />
              <GlobalButton title="Resgatar dinheiro" onPress={() => {}} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}
