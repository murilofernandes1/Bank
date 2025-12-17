import { View, TextInput, Text, Pressable } from "react-native";
import { useRef, useState } from "react";
import { styles } from "./styles";
type Props = {
  value: string;
  onChange: (value: string) => void;
  error: boolean;
};

export function PinInput({ value, onChange, error }: Props) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable
      onPress={() => {
        inputRef.current?.blur();
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      }}
    >
      <View style={{ flexDirection: "row", gap: 16 }}>
        {[0, 1, 2, 3].map((index) => (
          <View key={index} style={[error ? styles.error : styles.input]}>
            <Text style={{ fontSize: 28, color: "#e0f2ff" }}>
              {value[index] ? "•" : ""}
            </Text>
          </View>
        ))}
      </View>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChange}
        keyboardType="number-pad"
        maxLength={4}
        pointerEvents="none"
        style={{ position: "absolute", opacity: 0 }}
      />
    </Pressable>
  );
}
