import {
  Body,
  Button,
  SafeAreaView,
  Card,
  CardItem,
  Content,
  Left,
  Text,
  Thumbnail,
  Icon,
  Container,
} from "native-base";
import React, { useState } from "react";
import { Image, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import AllFoodsItem from "../components/AllFoodsItem";
// import FoodsItem from "../components/FoodsItem";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  categoryProductsContiner: {
    backgroundColor: "#EEEEEE",
    color: "black",
    borderRadius: 30,
    padding: 0,
    height: "100%",
    paddingTop: 20,
  },
  foodPrice: {
    color: "#FA4A0C",
    fontSize: 17,
    fontWeight: "bold",
  },
  foodTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  cardBody: {
    margin: 10,
    alignItems: "center",
  },
  category_food_title: {
    marginTop: 40,
    marginBottom: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

function CategoryProducts({ route, navigate }) {
  const [selectedId, setSelectedId] = useState(null);
  const { data, categoryName } = route.params;
  const renderItem = ({ item, index }) => {
    return <AllFoodsItem item={item} itemIndex={index} />;
  };

  const navigation = useNavigation();
  function onBackPressed() {
    navigation.goBack();
  }

  return (
    <Container style={{ backgroundColor: "#EEEEEE", height: "100%" }}>
      <ScrollView>
        <View style={{ marginHorizontal: 0, marginVertical: 10, height: "100%" }}>
          <View style={styles.category_food_title}>
            <TouchableOpacity
              title="Go back"
              onPress={() => onBackPressed()}
              style={{ marginRight: "31%", marginLeft: 30 }}
            >
              <Text style={{ fontSize: 40, lineHeight: 50, color: "black" }}>‹</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{categoryName}</Text>
          </View>
          <View style={styles.categoryProductsContiner}>
            {/* <SafeAreaView> */}
            <FlatList
              horizontal={false}
              numColumns={2}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
            {/* </SafeAreaView> */}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

export default CategoryProducts;
