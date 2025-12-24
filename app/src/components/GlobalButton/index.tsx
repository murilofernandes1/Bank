interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

export default function GlobalButton({
  title,
  onPress,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[styles.wrapper, disabled && styles.disabledWrapper]}
    >
      <LinearGradient
        colors={
          disabled
            ? ["#94a3b8", "#94a3b8"] // cinza quando desabilitado
            : ["#0d1b2a", "#1b263b", "#415a77"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
