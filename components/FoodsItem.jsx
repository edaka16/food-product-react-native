import { Body, Button, Card, CardItem, Content, Left, Text, Thumbnail, Icon, Container } from "native-base";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
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
});

function FoodsItem({ item }) {
  const navigation = useNavigation();

  const goToFoodDetails = () => {
    navigation.navigate("FoodDetails", { foodDetails: item });
  };

  const imageUrl = "http://192.168.1.31:1337" + item.product_images[0].url;
  return (
    <Container style={{ backgroundColor: "transparent", marginBottom: 10, height: "auto" }}>
      <Content style={{ marginHorizontal: 0, marginVertical: 0 }}>
        <Card
          style={{
            flex: 0,
            // margin: 15,
            backgroundColor: "transparent",
            elevation: 0,
            borderColor: "transparent",
            width: 200,
            height: 300,
          }}
        >
          <CardItem
            style={{
              backgroundColor: "white",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              borderRadius: 30,
            }}
          >
            <TouchableOpacity onPress={() => goToFoodDetails()}>
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 130, height: 130, marginHorizontal: 16, marginTop: -45, borderRadius: 70 }}
              />
              <Body style={styles.cardBody}>
                <Text style={styles.foodTitle}>{item.title}</Text>
                <Text style={styles.foodPrice}>N1.900</Text>
              </Body>
            </TouchableOpacity>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

export default FoodsItem;
