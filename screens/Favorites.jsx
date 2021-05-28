import { Text } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, View, Image, StyleSheet } from "react-native";
import AuthContext from "../AuthContext";

const styles = StyleSheet.create({
  favoriteItem_wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "pink",
  },
});

function Favorites() {
  const context = useContext(AuthContext);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    if (context.user && context.user !== "") {
      getFavoriteProducts();
    }
  }, [context]);

  const getFavoriteProducts = () => {
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
      });
  };

  const [selectedId, setSelectedId] = useState(null);
  const renderfavorite = ({ item, index }) => {
    const imageUrl = "http://192.168.1.31:1337" + item.product_images[index].url;
    console.log("🚀 ~ file: Favorites.jsx ~ line 35 ~ renderfavorite ~ imageUrl", imageUrl);
    console.log("🚀 ~ file: Favorites.jsx ~ line 34 ~ renderfavorite ~ item", item);
    return (
      <View style={styles.favoriteItem_wrapper}>
        <Image source={{ uri: imageUrl }} style={{ width: 150, height: 150 }} />
        <View>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>{item.price}</Text>
        </View>
      </View>
    );
  };

  console.log("🚀 ~ file: Favorites.jsx ~ line 9 ~ Favorites ~ favoriteProducts", favoriteProducts);
  return (
    <View>
      <Text>fsgadgfdfg</Text>
      <Text>fsgadgfdfg</Text>
      <Text>fsgadgfdfg</Text>
      <Text>fsgadgfdfg</Text>
      <FlatList
        horizontal={false}
        data={favoriteProducts}
        renderItem={renderfavorite}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
}

export default Favorites;
