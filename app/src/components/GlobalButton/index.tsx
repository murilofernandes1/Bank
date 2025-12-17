import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
type GradientButtonProps = {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export default function GradientButton({
  title,
  onPress,
  disabled,
}: GradientButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
