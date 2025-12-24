import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as Sharing from "expo-sharing";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { ArrowsLeftRightIcon, EmptyIcon } from "phosphor-react-native";
import BackButton from "../../../components/BackButton";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "hooks/useAuth";
import api from "services/api";
import LoadingScreen from "components/LoadingScreen";
import { Receipt } from "components/Receipt";
import { captureRef } from "react-native-view-shot";

interface TransacoesProps {
  id: string;
  destinationId: string;
  user: {
    name: string;
  };
  destinationUser: {
    name: string;
  };
  amount: number;
}

interface ReceiptProps {
  id: string;
  destinationId: string;
  user: {
    name: string;
  };
  destinationUser: {
    name: string;
  };
  amount: number;
  createdAt: string;
}

export default function Statement() {
  const [transfers, setTransfers] = useState<TransacoesProps[]>([]);
  const [receipt, setReceipt] = useState<ReceiptProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const receiptRef = useRef<View>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function loadTransfers() {
      try {
        const response = await api.get("/me/transfers");
        setTransfers(response.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadTransfers();
  }, []);

  async function seeReceipt(transfer: TransacoesProps) {
    try {
      setLoading(true);
      const response = await api.get(`/me/receipts/${transfer.id}`);
      setReceipt(response.data);
      setLoading(false);
      setReceiptOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function saveReceipt() {
    try {
      if (!receiptRef.current) return;

      const uri = await captureRef(receiptRef.current, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });

      console.log("IMAGE URI:", uri);

      if (!(await Sharing.isAvailableAsync())) {
        console.log("Sharing não disponível");
        return;
      }

      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Compartilhar comprovante",
      });
    } catch (error) {
      console.log("ERRO AO COMPARTILHAR:", error);
    }
  }
  if (loading) {
    return <LoadingScreen />;
  }

  if (receiptOpen) {
    return (
      <Receipt
        ref={receiptRef}
        onPress={saveReceipt}
        onClose={() => setReceiptOpen(false)}
        amount={receipt.amount}
        userName={receipt.user.name}
        destinationName={receipt.destinationUser.name}
        transactionId={receipt.id}
        createdAt={receipt.createdAt}
      />
    );
  }
  return (
    <>
      <View style={styles.screen}>
        <BackButton />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Extrato</Text>
          <Text style={styles.subtitle}>
            Acompanhe suas transações recentes
          </Text>

          <View style={styles.recentTransactions}>
            {transfers.length === 0 && (
              <View style={styles.emptyContainer}>
                <EmptyIcon size={64} color="grey" weight="thin" />
                <Text style={styles.emptyText}>
                  Nenhuma transação encontrada
                </Text>
              </View>
            )}
            {transfers.map((i) => (
              <TouchableOpacity onPress={() => seeReceipt(i)} key={i.id}>
                <LinearGradient
                  colors={["#0d1b2a", "#1b263b", "#415a77"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardRecentItem}
                >
                  <ArrowsLeftRightIcon
                    size={32}
                    color="#e0f2ff"
                    weight="bold"
                  />
                  <View style={styles.transactionInfo}>
                    {i.destinationId === user.id ? (
                      <Text style={styles.titleTransaction}>
                        Transferência de {i.user.name.split(" ")[0]}
                      </Text>
                    ) : (
                      <Text style={styles.titleTransaction}>
                        Transferência para{" "}
                        {i.destinationUser.name.split(" ")[0]}
                      </Text>
                    )}
                  </View>
                  <Text>
                    {i.destinationId === user.id ? (
                      <Text style={styles.entryValue}>
                        +
                        {i.amount.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Text>
                    ) : (
                      <Text style={styles.exitValue}>
                        -
                        {i.amount.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Text>
                    )}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
