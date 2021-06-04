import { Text, Icon } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, View, Image, StyleSheet, SectionList, TouchableOpacity, ScrollView } from "react-native";
import AuthContext from "../AuthContext";
import Swipeout from "react-native-swipeout";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  favoriteItem_wrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: "pink",
    marginHorizontal: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  content_of_favoriteProducts: {
    padding: 15,
    width: "auto",
  },
  description: {
    textAlign: "center",
    maxWidth: 200,
  },
  header_buttons: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
});

function Favorites() {
  const context = useContext(AuthContext);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  useEffect(() => {
    if (context.user && context.user !== "") {
      getFavoriteProducts();
    }
  }, [context]);

  const getFavoriteProducts = () => {
    setIsFetchingProducts(true);
    fetch("http://192.168.1.31:1337/foods-products?is_favorite_eq=true", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${context.user.jwt}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setFavoriteProducts(json);
      })
      .catch((error) => {
        console.error({ error });
      })
      .finally(() => {
        setIsFetchingProducts(false);
      });
  };

  const [selectedId, setSelectedId] = useState(null);
  const [rowIndex, setRowIndex] = useState(null);

  const onSwipeOpen = (indexRow) => {
    setRowIndex(indexRow);
  };
  const onSwipeClose = (indexRow) => {
    if (rowIndex === indexRow) {
      setRowIndex(null);
    }
  };

  const removeItemFromFavorite = (removeFavorite) => {
    fetch(`http://192.168.1.31:1337/foods-products/${removeFavorite.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${context.user.jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_favorite: !removeFavorite.is_favorite }),
    })
      .then((response) => response.json())
      .then((json) => {
        getFavoriteProducts();
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const renderfavorite = ({ item, index }) => {
    const imageUrl = "http://192.168.1.31:1337" + item.product_images[0].url;
    var swipeoutBtns = [
      {
        backgroundColor: "transparent",
        borderRadius: 40,
        onPress: () => removeItemFromFavorite(item),
        component: (
          <View
            style={{
              backgroundColor: "transparent",
              borderRadius: 50,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 25,
              marginLeft: -10,
            }}
          >
            <Icon
              style={{
                color: "white",
                paddingHorizontal: 11,
                paddingVertical: 10,
                fontSize: 20,
                backgroundColor: "#DF2C2C",
                borderRadius: 50,
              }}
              name="heart"
            ></Icon>
          </View>
        ),
      },
    ];

    return (
      <Swipeout
        right={swipeoutBtns}
        onOpen={() => onSwipeOpen(index)}
        close={rowIndex !== index}
        onClose={() => onSwipeClose(index)}
        rowIndex={index}
        sectionId={0}
        autoClose={true}
        buttonWidth={50}
        style={{ backgroundColor: "#F5F5F8" }}
      >
        <View
          style={{
            marginVertical: 7,
            marginHorizontal: 50,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            display: "flex",
            flexDirection: "row",
            borderRadius: 20,
          }}
        >
          <Image source={{ uri: imageUrl }} style={{ width: 60, height: 60, borderRadius: 50, margin: 15 }} />
          <View
            style={{
              width: "70%",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>{item.title}</Text>
            <Text
              style={{ color: "#FA4A0C", fontSize: 17, fontWeight: "bold", textAlign: "center", paddingBottom: 10 }}
            >
              {item.price}
            </Text>
          </View>
        </View>
      </Swipeout>
    );
  };

  const navigation = useNavigation();
  function onBackPressed() {
    navigation.goBack();
  }

  return (
    <View style={{ paddingTop: 30 }}>
      <ScrollView>
        <View style={styles.header_buttons}>
          <TouchableOpacity title="Go back" onPress={() => onBackPressed()}>
            <Text style={{ fontSize: 40, lineHeight: 50, color: "black", padding: 10 }}>‹</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 24, lineHeight: 50, color: "black", textAlign: "center", width: "90%" }}>
            Favorite
          </Text>
        </View>
        <FlatList
          refreshing={isFetchingProducts}
          onRefresh={getFavoriteProducts}
          horizontal={false}
          data={favoriteProducts}
          renderItem={renderfavorite}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </ScrollView>
    </View>
  );
}

export default Favorites;
