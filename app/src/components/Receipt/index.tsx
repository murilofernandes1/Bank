import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { XIcon, ShareIcon } from "phosphor-react-native";
import { forwardRef } from "react";

interface ReceiptProps {
  userName: string;
  amount: number;
  destinationName: string;
  transactionId: string;
  createdAt: string;
  onPress?: () => void;
  onClose?: () => void;
}

export const Receipt = forwardRef<View, ReceiptProps>(
  (
    {
      userName,
      destinationName,
      transactionId,
      createdAt,
      amount,
      onClose,
      onPress,
    },
    ref
  ) => {
    const parsedDate = new Date(createdAt);

    return (
      <LinearGradient
        colors={["#0d1b2a", "#1b263b", "#415a77"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onPress}>
            <ShareIcon color="#f0f7ff" size={26} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={onClose}>
            <XIcon color="#f0f7ff" size={26} />
          </TouchableOpacity>
        </View>

        <View collapsable={false} ref={ref} style={styles.card}>
          <Text style={styles.title}>Comprovante de Transação</Text>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>De</Text>
            <Text style={styles.value}>{userName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Para</Text>
            <Text style={styles.value}>{destinationName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Valor</Text>
            <Text style={styles.value}>
              {amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>ID</Text>
            <Text style={styles.mono}>{transactionId}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Data</Text>
            <Text style={styles.value}>
              {parsedDate.toLocaleDateString("pt-BR")}
            </Text>
          </View>

          <View style={styles.orbitWrapper}>
            <View style={styles.orbit}>
              <LinearGradient
                colors={["#e0f2ff", "#778da9"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.orbitCenter}
              />

              <LinearGradient
                colors={["#e0f2ff", "#778da9"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.orbitDot}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
);
