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
    backgroundColor: "transparent",
    alignItems: "center",
  },
  cardStyles: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    marginTop: 90,
    borderRadius: 30,
    width: "100%",
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
  evenCardStyles: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    marginTop: 45,
    borderRadius: 30,
    width: "100%",
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

function AllFoodsItem({ item, itemIndex }) {
  const navigation = useNavigation();

  const goToFoodDetails = () => {
    navigation.navigate("FoodDetails", { foodDetails: item });
  };

  const imgUrl = "http://192.168.1.31:1337" + item.product_images[0].url;
  return (
    <Container style={{ backgroundColor: "transparent", height: "100%" }}>
      <Content style={{ marginHorizontal: 16, marginVertical: 5 }}>
        <Card
          style={{
            flex: 0,
            margin: 0,
            backgroundColor: "transparent",
            elevation: 0,
            borderColor: "transparent",
            width: 160,
          }}
        >
          <CardItem style={itemIndex % 2 == 0 ? styles.evenCardStyles : styles.cardStyles}>
            <TouchableOpacity onPress={() => goToFoodDetails()}>
              <Image
                source={{ uri: imgUrl }}
                style={{ width: 100, height: 100, borderRadius: 50, marginTop: -60, marginHorizontal: 16 }}
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

export default AllFoodsItem;
