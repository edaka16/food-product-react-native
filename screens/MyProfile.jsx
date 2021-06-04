import { Text, Accordion, Content, Container, Icon, Button } from "native-base";
import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, TextInput, Alert, Modal, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../AuthContext";
import EditProfileModal from "../components/EditProfileModal";

const styles = StyleSheet.create({
  header_buttons: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  centeredView: {
    backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const MyProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  function onBackPressed() {
    navigation.goBack();
  }

  const context = useContext(AuthContext);
  const imageUrl = "http://192.168.1.31:1337" + context.user.user.profil_image.url;
  const [phoneNumber, setPhoneNumber] = useState(context.user.user.phone_number);
  const onChangeText = (phone_number) => {
    setPhoneNumber(phone_number);
  };

  const saveValue = () => {
    console.log("on save");
    fetch(`http://192.168.1.31:1337/users/${context.user.user.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${context.user.jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number: phoneNumber }),
    })
      .then((response) => response.json())
      .then((json) => {
        context.updateUser(json);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const dataArray = [
    {
      title: "First Element",
      content:
        "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet",
    },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" },
  ];

  const _renderHeader = (item, expanded) => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 20,
          paddingHorizontal: 10,
          margin: 10,
          borderRadius: 15,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontWeight: "600" }}> {item.title}</Text>
        {expanded ? (
          <Icon style={{ fontSize: 18 }} name="remove-circle" />
        ) : (
          <Icon style={{ fontSize: 18 }} name="add-circle" />
        )}
      </View>
    );
  };
  const _renderContent = (item) => {
    return (
      <Text
        style={{
          backgroundColor: "white",
          padding: 10,
          margin: 10,
          marginTop: -20,
          fontStyle: "italic",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderTopWidth: 2,
          borderTopColor: "#F5F5F9",
        }}
      >
        {item.content}
      </Text>
    );
  };

  return (
    <View style={{ paddingTop: 30 }}>
      <View style={styles.header_buttons}>
        <TouchableOpacity title="Go back" onPress={() => onBackPressed()}>
          <Text style={{ fontSize: 40, lineHeight: 50, color: "black", padding: 10 }}>‹</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 24, lineHeight: 50, color: "black", textAlign: "center", width: "85%" }}>
          My profile
        </Text>
      </View>

      <Text style={{ marginHorizontal: 10 }}>Information</Text>
      <Button onPress={() => setModalVisible(true)}>
        <Text>Edit Profile</Text>
      </Button>

      <View style={styles.centeredView}>
        <EditProfileModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          userDetails={context.user.user}
          imageUrl={imageUrl}
        />
      </View>

      <View
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "row",
          margin: 10,
          borderRadius: 20,
        }}
      >
        <Image source={{ uri: imageUrl }} style={{ width: 80, height: 80, borderRadius: 50, margin: 15 }} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ textTransform: "capitalize", marginVertical: 5 }}>{context.user.user.full_name}</Text>
          <Text style={{ marginVertical: 5 }}>{context.user.user.email}</Text>
          <TextInput
            onChangeText={(phoneNumber) => onChangeText(phoneNumber)}
            value={phoneNumber}
            onEndEditing={() => saveValue()}
          />
        </View>
      </View>

      <Accordion dataArray={dataArray} expanded={[0]} renderHeader={_renderHeader} renderContent={_renderContent} />
    </View>
  );
};

export default MyProfile;
