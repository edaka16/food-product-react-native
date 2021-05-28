import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Input,
  Item,
  Left,
  Right,
  Text,
  Title,
  View,
  ScrollableTab,
  Tabs,
  Tab,
  TabHeading,
  Image,
} from "native-base";
import Loading from "../components/Loading";
import LoginContent from "../components/LoginContent";
import Foods from "./Foods";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import AuthContext from "../AuthContext";
// import SideMenu from "react-native-side-nav";

const styles = StyleSheet.create({
  home_page: {
    backgroundColor: "#F2F2F2",
  },
  home_wrapper: {
    // backgroundColor: "#F2F2F2",
    paddingTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
  },
  header_text: {
    color: "green",
  },
  serach_Bar_container: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    backgroundColor: "#F2F2F2",
    // borderRadius: 40,
  },
  serach_Bar_wrapper: {
    elevation: 0,
    backgroundColor: "#F2F2F2",
    padding: 0,
    shadowColor: "transparent",
    shadowOpacity: 0,
  },
  serach_Bar: {
    borderRadius: 40,
    height: 60,
    backgroundColor: "#EEEEEE",
  },
  title: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: "bold",
    maxWidth: 190,
    marginBottom: 15,
  },
});
export default function Home(props) {
  const context = useContext(AuthContext);
  const [productsData, setProductsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    if (context.user && context.user !== "") {
      getProductsData();
      getCategoriesData();
    }
  }, [context]);

  const getProductsData = () => {
    fetch("http://192.168.1.31:1337/foods-products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${context.user.jwt}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setProductsData(json);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const getCategoriesData = () => {
    fetch("http://192.168.1.31:1337/categories", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${context.user.jwt}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCategoriesData(json);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    <Container style={styles.home_page}>
      <View style={styles.home_wrapper}>
        {/* <Button> */}
        {/* <Image source={require("../images/menu.png")} style={{}} /> */}
        <Icon name="menu" style={{ color: "black" }} />
        {/* </Button> */}
        <Button transparent>
          <Icon name="cart" style={{ color: "#9A9A9D" }} />
        </Button>
      </View>
      <View style={styles.serach_Bar_container}>
        <Text style={styles.title}>Delicious food for you</Text>
        <Header searchBar rounded style={styles.serach_Bar_wrapper}>
          <Item style={styles.serach_Bar}>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </View>
      {categoriesData && Array.isArray(categoriesData) && categoriesData.length > 0 && (
        <Tabs
          tabBarBackgroundColor={"#F2F2F2"}
          style={{
            backgroundColor: "#F2F2F2",
            elevation: 0,
            borderBottomWidth: 0,
            borderBottomColor: "red",
            marginTop: 0,
            zIndex: 100,
          }}
          locked={true}
          renderTabBar={() => (
            <ScrollableTab
              style={{
                marginLeft: 35,
                elevation: 0,
              }}
              underlineStyle={{ backgroundColor: "#FA4A0C" }}
            />
          )}
        >
          {categoriesData.map((category) => {
            return (
              <Tab
                heading={
                  <TabHeading style={{ backgroundColor: "#F2F2F2" }} activeTextStyle={{ color: "#FA4A0C" }}>
                    <Text style={{ color: "#FA4A0C" }}>{category.title}</Text>
                  </TabHeading>
                }
              >
                <Foods navigate={props.navigation} productsData={productsData} categoryId={category.id} />
              </Tab>
            );
          })}
        </Tabs>
      )}

      {/* </SideMenu> */}
    </Container>
  );
}
