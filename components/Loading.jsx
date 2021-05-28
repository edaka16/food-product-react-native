import React from "react";
import { Text, View, StyleSheet, Image, Animated, Easing } from "react-native";

const styles = StyleSheet.create({
  title: {
    color: "black",
    textAlign: "center",
    color: "red",
    fontSize: 10,
    lineHeight: 12,
  },
  loading_wrapper: {
    width: 262,
    height: 262,
    borderRadius: 131,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const spinValue = new Animated.Value(0);

// First set up animation
Animated.timing(spinValue, {
  toValue: 1,
  duration: 3000,
  easing: Easing.linear, // Easing is an additional import from react-native
  useNativeDriver: true, // To make use of native driver for performance
}).start();

// Next, interpolate beginning and end values (in this case 0 and 1)
const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
});

Animated.loop(
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: true,
  })
).start();

function Loading() {
  return (
    <View style={styles.loading_wrapper}>
      <Image source={require("../images/Bella-Olonje.png")} style={{ width: "95%", marginTop: 10 }} />
      <Text style={styles.title}>Food for Everyone</Text>
      <Animated.Image
        style={{ marginTop: 26, width: 45, transform: [{ rotate: spin }] }}
        source={require("../images/loading-icon.png")}
      ></Animated.Image>
    </View>
  );
}

export default Loading;
