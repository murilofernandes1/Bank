import { TouchableOpacity } from "react-native";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
export default function AlternativeBackButton() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}
    >
      <ArrowLeftIcon size={35} weight="regular" color="#e0f2ff" />
    </TouchableOpacity>
  );
}
