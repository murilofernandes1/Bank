import { TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
type GradientButtonProps = {
  title: string;
  onPress: () => void;
};

export default function GradientButton({
  title,
  onPress,
}: GradientButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#d6eaff", "#c5dbf4ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
