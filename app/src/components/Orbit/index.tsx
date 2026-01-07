import { View, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  centerSize?: number;
  orbitSize?: number;
  orbitRadius?: number;
  orbitDuration?: number;
}

export default function Orbit({
  centerSize = 70,
  orbitSize = 40,
  orbitRadius = 100,
  orbitDuration = 4000000,
}: Props) {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    rotate.setValue(0);
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, [orbitDuration]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={{
        position: "relative",
        width: orbitRadius * 2 + orbitSize,
        height: orbitRadius * 2 + orbitSize,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LinearGradient
        colors={["#e0f2ff", "#778da9"]}
        style={{
          width: centerSize,
          height: centerSize,
          borderRadius: 999,
          position: "absolute",
        }}
      />

      <Animated.View
        style={{
          position: "absolute",
          width: orbitRadius * 2,
          height: orbitRadius * 2,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ rotate: spin }],
        }}
      >
        <LinearGradient
          colors={["#e0f2ff", "#778da9"]}
          style={{
            width: orbitSize,
            height: orbitSize,
            borderRadius: 999,
            position: "absolute",
            top: 0,
          }}
        />
      </Animated.View>
    </View>
  );
}
