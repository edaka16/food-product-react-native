import { Right, Text } from "native-base";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import FoodsItem from "../components/FoodsItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#F2F2F2",
  },
  item: {
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const Item = ({ item, onPress, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <FoodsItem item={item} />
  </TouchableOpacity>
);

export default function Foods({ navigate, productsData, categoryId }) {
  const [selectedId, setSelectedId] = useState(null);
  let categoryName = "";

  const hasCategory = (categories, id_of_category) => {
    const foundedIndex = categories.findIndex((element) => {
      if (element.id === id_of_category) {
        categoryName = element.title;
        return true;
      }
      return false;
    });
    if (foundedIndex === -1) {
      return false;
    }
    return true;
  };

  const filteredProduct = productsData.filter((item) => {
    if (hasCategory(item.categories, categoryId)) {
      return true;
    }
    return false;
  });

  const renderItem = ({ item }) => {
    return <Item item={item} onPress={() => setSelectedId(item.id)} />;
  };

  const ContinueToEachCategory = () => {
    navigate.navigate("CategoryProducts", { categoryName: categoryName, data: filteredProduct, navigate: navigate });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={ContinueToEachCategory}
        style={{ alignItems: "flex-end", paddingRight: 35, paddingTop: 15 }}
      >
        <Text style={{ color: "#FA4A0C" }}>see more</Text>
      </TouchableOpacity>
      <FlatList
        horizontal={true}
        data={filteredProduct}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}
