import { Text } from "native-base";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SideMenu from "react-native-side-nav";

const styles = StyleSheet.create({});

function Menu() {
  const [menuExpanded, setMenuExpanded] = useState(false);

  const toggleMenu = () => {
    setMenuExpanded(!menuExpanded);
  };

  const menuComponent = () => {
    return (
      <View style={styles.animatedBox}>
        <TouchableOpacity onPress={toggleMenu}>
          <Text>x</Text>
        </TouchableOpacity>
        <Text style={{ color: "black" }}>Test222222</Text>
      </View>
    );
  };
  return (
    <View>
      <SideMenu
        animationFunction={(prop, value) =>
          Animated.spring(prop, {
            toValue: value,
            friction: 8,
            useNativeDriver: true,
          })
        }
        menuExpanded={menuExpanded}
        menuComponent={menuComponent()}
        burgerIcon={true}
        onPress={toggleMenu}
        push={true}
        menuWidth={20}
        leftAligned={true}
      />
    </View>
  );
}

export default Menu;
