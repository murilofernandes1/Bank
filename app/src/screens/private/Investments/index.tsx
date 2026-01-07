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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "hooks/useAuth";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { PlusIcon, PiggyBankIcon } from "phosphor-react-native";
import LoadingScreen from "components/LoadingScreen";
import GlobalButton from "components/GlobalButton";
import CurrencyInput from "react-native-currency-input";
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
  const { user } = useAuth();
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
      await api.post("/me/savings", { goalName, targetAmount });
      setCreateModalVisible(false);
      setGoalName("");
      setTargetAmount(null);
      await loadPiggys();
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePiggy() {
    if (!selectedPiggy) return;

    try {
      setLoading(true);
      await api.delete(`/me/savings/${selectedPiggy.id}`);
      setDetailsModalVisible(false);
      setSelectedPiggy(null);
      await loadPiggys();
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }

  const totalSaved = piggy.reduce((acc, p) => acc + p.currentAmount, 0);

  return (
    <View style={styles.screen}>
      <BackButton />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Reservas</Text>
        <Text style={styles.subtitle}>
          Com os porquinhos da Orbit você pode criar reservas de emergência,
          alcançar metas e realizar sonhos.
        </Text>

        <View style={styles.summaryCard}>
          <LinearGradient
            colors={["#0f172a", "#1e293b"]}
            style={styles.summaryGradient}
          >
            <Text style={styles.summaryLabel}>Total guardado</Text>
            <Text style={styles.summaryValue}>
              {totalSaved.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
            <Text style={styles.summarySub}>
              {piggy.length} porquinho{piggy.length !== 1 && "s"} ativo
              {piggy.length !== 1 && "s"}
            </Text>
          </LinearGradient>
        </View>

        <Text style={styles.section}>Meus porquinhos</Text>

        {piggy.length === 0 ? (
          <View style={styles.emptyState}>
            <LinearGradient
              colors={["#1e293b", "#334155"]}
              style={styles.emptyCircle}
            >
              <PiggyBankIcon size={34} color="#e5f0ff" />
            </LinearGradient>

            <Text style={styles.emptyTitle}>Nenhum porquinho criado</Text>
            <Text style={styles.emptySubtitle}>
              Crie um objetivo e comece a guardar dinheiro hoje mesmo
            </Text>

            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => setCreateModalVisible(true)}
              activeOpacity={0.85}
            >
              <PlusIcon size={18} color="#ffffff" />
              <Text style={styles.emptyButtonText}>
                Criar primeiro porquinho
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {piggy.map((p) => {
              const percentage = Math.min(
                (p.currentAmount / p.targetAmount) * 100,
                100
              );

              return (
                <TouchableOpacity
                  key={p.id}
                  style={styles.piggyCard}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSelectedPiggy(p);
                    setTargetAmount(null);
                    setDetailsModalVisible(true);
                  }}
                >
                  <LinearGradient
                    colors={["#1e293b", "#334155"]}
                    style={styles.piggyCircle}
                  >
                    <PiggyBankIcon size={30} color="#e5f0ff" />
                  </LinearGradient>

                  <Text style={styles.piggyTitle} numberOfLines={1}>
                    {p.goalName}
                  </Text>

                  <Text style={styles.piggyValue}>
                    {p.currentAmount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>

                  <View style={styles.cardProgressBackground}>
                    <View
                      style={[
                        styles.cardProgressFill,
                        { width: `${percentage}%` },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={[styles.piggyCard, styles.createCard]}
              activeOpacity={0.85}
              onPress={() => setCreateModalVisible(true)}
            >
              <View style={styles.createCircle}>
                <PlusIcon size={26} color="#334155" />
              </View>

              <Text style={styles.piggyTitle}>Novo porquinho</Text>
              <Text style={styles.piggySubtitle}>Criar objetivo</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </ScrollView>

      <Modal visible={createModalVisible} transparent animationType="fade">
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

      <Modal visible={detailsModalVisible} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDetailsModalVisible(false)}
        />

        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />

          {selectedPiggy &&
            (() => {
              const percentage = Math.min(
                (selectedPiggy.currentAmount / selectedPiggy.targetAmount) *
                  100,
                100
              );

              return (
                <>
                  <LinearGradient
                    colors={["#0d1b2a", "#1b263b", "#415a77"]}
                    style={styles.modalCircle}
                  >
                    <PiggyBankIcon size={38} color="#e5f0ff" />
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

                  <View style={styles.progressContainer}>
                    <View style={styles.progressBackground}>
                      <View
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

                  <CurrencyInput
                    value={targetAmount}
                    onChangeValue={setTargetAmount}
                    prefix="R$ "
                    delimiter="."
                    separator=","
                    precision={2}
                    placeholder="Quanto deseja guardar?"
                    style={styles.input}
                  />

                  <GlobalButton
                    title={
                      targetAmount > user.balance
                        ? "Saldo insuficiente"
                        : "Adicionar dinheiro"
                    }
                    disabled={
                      !targetAmount ||
                      targetAmount <= 0 ||
                      targetAmount > user.balance
                    }
                    onPress={() => {
                      setDetailsModalVisible(false);
                      navigation.navigate("PiggyConfirm", {
                        piggyId: selectedPiggy.id,
                        amount: targetAmount,
                        type: "DEPOSIT",
                      });
                    }}
                  />

                  <GlobalButton
                    title={
                      targetAmount <= 0
                        ? "Resgatar dinheiro"
                        : targetAmount > selectedPiggy.currentAmount
                        ? "Saldo insuficiente no porquinho"
                        : "Resgatar dinheiro"
                    }
                    disabled={
                      !targetAmount ||
                      targetAmount <= 0 ||
                      targetAmount > selectedPiggy.currentAmount
                    }
                    onPress={() => {
                      setDetailsModalVisible(false);
                      navigation.navigate("PiggyConfirm", {
                        piggyId: selectedPiggy.id,
                        amount: targetAmount,
                        type: "WITHDRAW",
                      });
                    }}
                  />

                  <GlobalButton
                    onPress={handleDeletePiggy}
                    title={
                      selectedPiggy.currentAmount > 0
                        ? "Esvazie o porquinho antes de excluí-lo"
                        : "Excluir porquinho"
                    }
                    disabled={selectedPiggy.currentAmount > 0}
                  />
                </>
              );
            })()}
        </View>
      </Modal>
    </View>
  );
}
