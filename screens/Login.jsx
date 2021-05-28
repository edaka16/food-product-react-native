import React, { useState } from "react";
import { Container, Content, Text, Tabs } from "native-base";
import { Image, StyleSheet, View, ScrollView } from "react-native";
import LoginContent from "../components/LoginContent";
import SignUpContent from "../components/SignUpContent";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const styles = StyleSheet.create({
  login_wrapper: {
    backgroundColor: "#F2F2F2",
  },
  cover_wrapper: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    paddingTop: 100,
    paddingBottom: 15,
  },
});

const Stack = createStackNavigator();
const Tabi = createMaterialTopTabNavigator();

export default function Login(props) {
  return (
    <ScrollView>
      <Container style={styles.login_wrapper}>
        <View style={styles.cover_wrapper}>
          <Image source={require("../images/login-cover.png")} />
        </View>
        <Tabi.Navigator
          initialRouteName="Login"
          tabBarOptions={{
            activeTintColor: "#FFFFFF",
            inactiveTintColor: "#F8F8F8",
            style: {
              backgroundColor: "white",
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
            },
            labelStyle: {
              fontWeight: "bold",
              fontSize: 18,
              lineHeight: 21,
              color: "black",
              textAlign: "center",
              textTransform: "none",
            },
            indicatorStyle: {
              borderBottomColor: "#FA4A0C",
              borderBottomWidth: 2,
              width: 110,
              marginLeft: "9%",
            },
          }}
        >
          <Tabi.Screen
            name="LoginContent"
            children={() => <LoginContent propName={props} />}
            // component={LoginContent}
            options={{
              tabBarLabel: "Login",
            }}
          />
          <Tabi.Screen
            name="SignUpContent"
            children={() => <SignUpContent propName={props} />}
            // component={SignUpContent}
            options={{
              tabBarLabel: "Sign-up",
            }}
          />
        </Tabi.Navigator>
      </Container>
    </ScrollView>
  );
}
