import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Container, Icon } from "native-base";
import Home from "./Home";
import Favorites from "./Favorites";
import MyProfile from "./MyProfile";
import Recent from "./Recent";
import { StatusBar } from "react-native";

const Tab = createMaterialBottomTabNavigator();
function BottomTabs() {
  return (
    <Container>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="red"
        inactiveColor="#3e2465"
        barStyle={{
          backgroundColor: "#F2F2F2",
          shadowColor: "transparent",
          shadowOpacity: 0,
          elevation: 0,
          paddingBottom: 20,
        }}
      >
        <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => <Icon name="home" /> }} />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{ tabBarIcon: () => <Icon name="heart" />, backgroundColor: "red" }}
        />
        <Tab.Screen name="MyProfile" component={MyProfile} options={{ tabBarIcon: () => <Icon name="person" /> }} />
        <Tab.Screen name="Recent" component={Recent} options={{ tabBarIcon: () => <Icon name="alarm" /> }} />
      </Tab.Navigator>
    </Container>
  );
}

export default BottomTabs;
