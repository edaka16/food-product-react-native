import { Button, Container, Content, Form, Input, Item, Label } from "native-base";
import React, { useState, useContext } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { withFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../AuthContext";
import { NavigationActions } from "@react-navigation/native";

const styles = StyleSheet.create({
  login_content: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 62,
    backgroundColor: "#F2F2F2",
  },
  text_input: {
    borderBottomWidth: 1,
    borderColor: "black",
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
  },
  forget_pssw_content: {
    flex: 1,
    // alignItems: "center",
    padding: 15,
    marginTop: 30,
  },
  forget_text: {
    color: "#FA4A0C",
    fontSize: 17,
    fontWeight: "bold",
  },
  login_button: {
    backgroundColor: "#FA4A0C",
    borderRadius: 30,
    width: "100%",
    marginTop: 70,
    height: 70,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

// const handleSenddata = (values, context, navigation) => {
//   fetch("http://192.168.1.31:1337/auth/local", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       identifier: values.email,
//       password: values.password,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       context.saveUser(data);
//       navigation.navigate("Home");
//     })
//     .catch((error) => console.log("🚀 ~ file: LoginContent.jsx ~ line 47 ~ handleSenddata ~ error", error));
// };

const SignUpContent = ({ handleChange, handleBlur, handleSubmit, values, setFieldValue, propName }) => {
  const context = useContext(AuthContext);

  return (
    <View style={styles.login_content}>
      {/* <Form>
        <Label>Email address</Label>
        <TextInput
          style={styles.text_input}
          onChangeText={(e) => {
            setFieldValue("email", e);
          }}
          onBlur={() => handleBlur("email")}
          value={values.email}
        />

        <Button
          onPress={(e) => {
            handleSenddata(values, context, propName.navigation);
          }}
          style={styles.login_button}
        >
          <Text style={{ textAlign: "center", fontSize: 20, color: "white", margin: "auto" }}>Sign Up</Text>
        </Button>
      </Form> */}
      <Text style={{ textAlign: "center", fontSize: 20, color: "white", margin: "auto" }}>Sign Up</Text>
    </View>
  );
};

const validSchema = (props) => {
  return Yup.object().shape({
    email: Yup.string().required("Required"),
  });
};

const FormikApp = withFormik({
  mapPropsToValues: (componentProps) => {
    return {
      email: "",
    };
  },
  validationSchema: validSchema,
  enableReinitialize: true,
})(SignUpContent);

export default FormikApp;
