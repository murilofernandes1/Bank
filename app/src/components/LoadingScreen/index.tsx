import { View, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  size?: number;
  orbitSize?: number;
  orbitRadius?: number;
  orbitDuration?: number;
}

export default function LoadingScreen({
  size = 80,
  orbitSize = 20,
  orbitRadius = 70,
  orbitDuration = 4000,
}: Props) {
  const rotate = useRef(new Animated.Value(0)).current;
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    rotate.setValue(0);

    loopRef.current = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: orbitDuration,
        useNativeDriver: true,
      })
    );

    loopRef.current.start();

    return () => {
      loopRef.current?.stop();
      rotate.stopAnimation();
    };
  }, [orbitDuration]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0d1b2a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            width: size,
            height: size,
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
    </View>
  );
}
