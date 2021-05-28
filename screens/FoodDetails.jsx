import { Button, Text, Icon } from "native-base";
import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Image, ScrollView } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";

function FoodDetails({ route }) {
  const { foodDetails } = route.params;

  const ref = useRef();

  const styles = StyleSheet.create({
    login_button: {
      backgroundColor: "#FA4A0C",
      borderRadius: 30,
      width: "90%",
      marginHorizontal: 20,
      marginVertical: 20,
      height: 70,
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    details_content: {
      display: "flex",
      justifyContent: "center",
      marginHorizontal: 30,
    },
    mainTitle: {
      textAlign: "center",
      fontSize: 28,
      fontWeight: "bold",
      color: "black",
    },
    price: {
      color: "#FA4A0C",
      fontSize: 17,
      fontWeight: "bold",
      textAlign: "center",
    },
    title: {
      fontSize: 17,
      fontWeight: "bold",
      marginTop: 20,
    },
    description: {
      fontSize: 17,
      color: "black",
      opacity: 0.5,
    },
    header_buttons: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      marginHorizontal: 30,
    },
  });

  const renderItem = ({ item, index }) => {
    const imageUrl = "http://192.168.1.31:1337" + item.url;
    return (
      <View
        style={{
          backgroundColor: "transparent",
          borderRadius: 0,
          marginHorizontal: 65,
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 210, height: 210, marginHorizontal: 20, borderRadius: 130 }}
        />
      </View>
    );
  };

  const [activeSlider, setActiveSlider] = useState(0);

  const navigation = useNavigation();
  function onBackPressed() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6F9", paddingTop: 50 }}>
      <ScrollView>
        <View style={styles.header_buttons}>
          <TouchableOpacity title="Go back" onPress={() => onBackPressed()}>
            <Text style={{ fontSize: 40, lineHeight: 50, color: "black", padding: 10 }}>‹</Text>
          </TouchableOpacity>

          <TouchableOpacity title="Go back" onPress={() => onBackPressed()}>
            <Text style={{ fontSize: 40, lineHeight: 50, color: "black" }}>
              <Icon name="heart" />
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
          <Carousel
            layout={"default"}
            ref={(c) => {
              ref.current = c;
            }}
            data={foodDetails.product_images}
            sliderWidth={500}
            itemWidth={500}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveSlider(index)}
          />
          <Pagination
            dotsLength={foodDetails.product_images.length}
            activeDotIndex={activeSlider}
            containerStyle={{ backgroundColor: "transparent", height: 61, width: "95%" }}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: "#FA4A0C",
            }}
            inactiveDotStyle={{
              backgroundColor: "#C4C4C4",
            }}
            inactiveDotScale={1}
          />
        </View>
        <View style={styles.details_content}>
          <Text style={styles.mainTitle}>{foodDetails.title}</Text>
          <Text style={styles.price}>{foodDetails.price}</Text>

          <Text style={styles.title}>Ingredients</Text>
          <Text style={styles.description}>{foodDetails.description}</Text>

          <Text style={styles.title}>Delivery info</Text>
          <Text style={styles.description}>Delivered between monday aug and thursday 20 from 8pm to 91:32 pm</Text>

          <Text style={styles.title}>Return policy</Text>
          <Text style={styles.description}>
            All our foods are double checked before leaving our stores so by any case you found a broken food please
            contact our hotline immediately.
          </Text>
        </View>
        <View>
          <Button
            onPress={(e) => {
              // handleSenddata();
            }}
            style={styles.login_button}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18, color: "white", margin: "auto", textTransform: "capitalize" }}
            >
              Add to cart
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default FoodDetails;
