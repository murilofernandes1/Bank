import BackButton from "../../../components/BackButton";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { PlusIcon, PiggyBankIcon } from "phosphor-react-native";
import LoadingScreen from "components/LoadingScreen";
import GlobalButton from "components/GlobalButton";
import CurrencyInput from "react-native-currency-input";
import api from "services/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PiggyProps = {
  id: string;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
};

export default function Investments() {
  const [piggy, setPiggy] = useState<PiggyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedPiggy, setSelectedPiggy] = useState<PiggyProps | null>(null);

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState<number | null>(null);

  async function loadPiggys() {
    try {
      setLoading(true);
      const response = await api.get("/me/savings");
      setPiggy(response.data);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPiggys();
    }, [])
  );

  async function handleCreatePiggy() {
    if (!goalName || !targetAmount || targetAmount <= 0) return;

    try {
      setLoading(true);
      await api.post("/me/savings", {
        goalName,
        targetAmount,
      });
      setCreateModalVisible(false);
      setGoalName("");
      setTargetAmount(null);
      await loadPiggys();
    } catch {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }

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
          {piggy.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={styles.piggyCard}
              onPress={() => {
                setSelectedPiggy(p);
                setDetailsModalVisible(true);
              }}
            >
              <LinearGradient
                colors={["#0d1b2a", "#1b263b", "#415a77"]}
                style={styles.piggyCircle}
              >
                <PiggyBankIcon size={36} color="#e0f2ff" />
              </LinearGradient>

              <Text style={styles.piggyTitle}>{p.goalName}</Text>
              <Text style={styles.piggyValue}>
                {p.currentAmount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.piggyCard, styles.createCard]}
            onPress={() => setCreateModalVisible(true)}
          >
            <LinearGradient
              colors={["#1b263b", "#415a77"]}
              style={styles.piggyCircle}
            >
              <PlusIcon size={36} color="#e0f2ff" />
            </LinearGradient>

            <Text style={styles.piggyTitle}>Novo porquinho</Text>
            <Text style={styles.piggySubtitle}>Criar objetivo</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      <Modal
        visible={createModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setCreateModalVisible(false)}
        />

        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />

          <Text style={styles.modalTitle2}>Novo porquinho</Text>

          <TextInput
            value={goalName}
            onChangeText={setGoalName}
            placeholder="Nome do objetivo"
            style={styles.input}
          />

          <CurrencyInput
            value={targetAmount}
            onChangeValue={setTargetAmount}
            prefix="R$ "
            delimiter="."
            separator=","
            precision={2}
            placeholder="Meta desejada"
            style={styles.input}
          />

          <GlobalButton
            title="Criar porquinho"
            onPress={handleCreatePiggy}
            disabled={!goalName || !targetAmount || targetAmount <= 0}
          />
        </View>
      </Modal>

      <Modal
        visible={detailsModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDetailsModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDetailsModalVisible(false)}
        />

        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />

          {selectedPiggy &&
            (() => {
              const progress =
                selectedPiggy.currentAmount / selectedPiggy.targetAmount;

              const percentage = Math.min(progress * 100, 100);

              return (
                <>
                  <LinearGradient
                    colors={["#0d1b2a", "#1b263b", "#415a77"]}
                    style={styles.modalCircle}
                  >
                    <PiggyBankIcon size={42} color="#e0f2ff" />
                  </LinearGradient>

                  <Text style={styles.modalTitle}>
                    {selectedPiggy.goalName}
                  </Text>

                  <Text style={styles.modalValueMain}>
                    {selectedPiggy.currentAmount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>

                  <Text style={styles.modalSubValue}>
                    de{" "}
                    {selectedPiggy.targetAmount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressBackground}>
                      <LinearGradient
                        colors={["#1b263b", "#415a77"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                          styles.progressFill,
                          { width: `${percentage}%` },
                        ]}
                      />
                    </View>

                    <Text style={styles.progressText}>
                      {percentage.toFixed(0)}% da meta
                    </Text>
                  </View>

                  <GlobalButton
                    title="Adicionar dinheiro"
                    onPress={() => {
                      setDetailsModalVisible(false);
                      navigation.navigate("PiggyValue", {
                        type: "DEPOSIT",
                        piggyId: selectedPiggy.id,
                      });
                    }}
                  />

                  <GlobalButton
                    title="Resgatar dinheiro"
                    onPress={() => {
                      setDetailsModalVisible(false);
                      navigation.navigate("PiggyValue", {
                        type: "WITHDRAW",
                        piggyId: selectedPiggy.id,
                        currentAmount: selectedPiggy.currentAmount,
                      });
                    }}
                  />
                </>
              );
            })()}
        </View>
      </Modal>
    </View>
  );
}
