import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React, { useContext, useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";
import AuthContext from "../AuthContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  cover_image: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});

function LoadingScreen(props) {
  const context = useContext(AuthContext);
  useEffect(() => {
    AsyncStorage.getItem("USER_DATA").then((value) => {
      if (value) {
        // context.setUser(JSON.parse(value));
        props.navigation.navigate("BottomTabs");
      } else {
        props.navigation.navigate("Login");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../images/cover-image.png")} style={styles.cover_image}>
        <Loading />
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

export default LoadingScreen;
