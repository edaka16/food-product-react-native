import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import LoadingScreen from "./screens/LoadingScreen";
import Login from "./screens/Login";
import { createStackNavigator, HeaderBackground } from "@react-navigation/stack";
import ForgetPassword from "./screens/ForgetPassword";
import AuthContext from "./AuthContext";
import BottomTabs from "./screens/BottomTabs";
import MyProfile from "./screens/MyProfile";
import Favorites from "./screens/Favorites";
import Recent from "./screens/Recent";
import Home from "./screens/Home";
import CategoryProducts from "./screens/CategoryProducts";
import FoodDetails from "./screens/FoodDetails";

export default function App() {
  const Stack = createStackNavigator();
  // const nav = useNavigation();

  const [user, setUser] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("USER_DATA").then((value) => {
      if (value) {
        try {
          const parsedUser = JSON.parse(value);
          setUser(parsedUser);
        } catch (error) {
          AsyncStorage.removeItem("USER_DATA");
        }
      }
    });
  }, []);

  const saveUser = (userData) => {
    if (userData) {
      setUser(userData);
      AsyncStorage.setItem("USER_DATA", `${JSON.stringify(userData)}`);
    }
  };

  const updateUser = (newUserData) => {
    if (newUserData) {
      AsyncStorage.getItem("USER_DATA").then((value) => {
        if (value) {
          try {
            const parsedUser = JSON.parse(value);
            saveUser({ ...parsedUser, user: newUserData });
          } catch (error) {
            AsyncStorage.removeItem("USER_DATA");
          }
        }
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, saveUser, setUser, updateUser }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="MyProfile" component={MyProfile} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="Recent" component={Recent} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
          <Stack.Screen name="FoodDetails" component={FoodDetails} />
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{
              title: "My home",
              headerStyle: {
                backgroundColor: "red",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
