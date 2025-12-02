import { View, ScrollView, Text } from "react-native";
import { styles } from "./styles";
import BackButton from "../../components/BackButton";
export default function Pix() {
  return (
    <>
      <View style={styles.screen}>
        <BackButton />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text>Oi</Text>
        </ScrollView>
      </View>
    </>
  );
}
