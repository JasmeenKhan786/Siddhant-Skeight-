import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { AntDesign } from "@expo/vector-icons";

export default class Reset extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };
  }

  render() {
    return (
      <View style={{ marginTop: '15%', flex: 1 }}>
        <TouchableOpacity
          style={{ marginLeft: "5%" }}
          onPress={() => {
            this.props.navigation.replace("Login");
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>

        <TextInput
          style={{
            marginTop: '30%',
            padding: 5,
            width: "80%",
            height: 30,
            borderWidth: 1,
            borderRadius: 6,
            alignSelf: "center",
          }}
          placeholder="Enter Email"
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            width: "50%",
            height: 30,
            padding: 5,
            marginTop:30,
            borderRadius: 10,
            alignSelf: "center",
          }}
          onPress={() => {
            if (this.state.email) {
              firebase
                .auth()
                .sendPasswordResetEmail(this.state.email)
                .then(() => {
                  Alert.alert("Password Reset Email Sent!!");
                })
                .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  alert("Something went wrong! Try later!");
                });
            } else {
              alert("Please enter a valid email, registered with us");
            }
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            Send Request Email
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
