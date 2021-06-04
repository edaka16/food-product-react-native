import React, { useState } from "react";
import { Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ImagePicker } from "react-native-image-picker";

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
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
    marginBottom: 20,
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

// const options = {
//   title: "Select Avatar",
//   storageOptions: {
//     skipBackup: true,
//     path: "images",
//   },
// };

// ImagePicker.showImagePicker(options, (response) => {
//   console.log("Response = ", response);

//   if (response.didCancel) {
//     console.log("User cancelled image picker");
//   } else if (response.error) {
//     console.log("ImagePicker Error: ", response.error);
//   } else {
//     const uri = response.uri;
//     this.setState({
//       selectedPictureUri: uri,
//     });
//   }
// });

function EditProfileModal({ modalVisible, setModalVisible, userDetails, imageUrl }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>✓</Text>
        </Pressable>
        <Image source={{ uri: imageUrl }} style={{ width: 80, height: 80, borderRadius: 50, margin: 15 }} />
        <Text>Change Profile Photo</Text>
        <View style={{ width: "90%" }}>
          <Text>Username</Text>
          <TextInput
            style={{
              textTransform: "capitalize",
              marginVertical: 5,
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          >
            {userDetails.full_name}
          </TextInput>
          <Text>Email</Text>
          <TextInput style={{ marginVertical: 5, borderBottomColor: "black", borderBottomWidth: 1 }}>
            {userDetails.email}
          </TextInput>
          <Text>Phone number</Text>
          <TextInput
            style={{ borderBottomColor: "black", borderBottomWidth: 1 }}
            value={userDetails.phone_number}
            onEndEditing={() => saveValue()}
          />
        </View>
      </View>
    </Modal>
  );
}

export default EditProfileModal;
