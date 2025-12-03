import { TouchableOpacity } from "react-native";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
export default function ParamsCleanerBackButton({
  onPress,
}: {
  onPress: () => void;
}) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <ArrowLeftIcon size={35} weight="regular" color="#0d1b2a" />
    </TouchableOpacity>
  );
}
