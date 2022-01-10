import db from "../config";
import firebase from "firebase";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ScrollView,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import PdfReader from "rn-pdf-reader-js";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";

export default class MentorDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      mentors: [],
      doc: "",
      uploading: false,
      userId: firebase.auth().currentUser.email,
      modalvisible: false,
    };
  }

  sendRequest = () => {
    db.collection("request").add({
      menteeName: firebase.auth().currentUser.displayName,
      menteeEmail: firebase.auth().currentUser.email,
      menteeSOP: this.state.doc,
      mentorId: this.state.id,
      mentorEmail: this.state.mentors.email,
      mentorName: this.state.mentors.name,
      mentorImage: this.state.mentors.image,
      industry: this.state.mentors.industry,
      status: "Pending",
    });
    alert("Request Sent!");
  };
  getMentors = async () => {
    var resp = await db.collection("mentor").doc(this.state.id).get();
    this.setState({
      mentors: resp.data(),
    });
  };
  componentDidMount() {
    this.getMentors();
  }

  selectPicture = async (path) => {
    this.setState({ uploading: true }); 
    const { size, name, type, uri } = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: false,
    });

    if (type === "success") {
      this.uploadImage(uri, this.state.userId, path);
    }
  };

  uploadImage = async (uri, imageName, path) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(path + imageName);

    return ref
      .put(blob, {
        contentType: "application/pdf",
      })
      .then((response) => {
        this.fetchImage(imageName, path);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  fetchImage = (imageName, path) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child(path + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ doc: url });
      })
      .catch((error) => {
        alert("No Files uploaded yet for this user!");
        this.setState({ doc: "#" });
      });
  };
  //optional method for opening the document
  openDocument = (url) => {
    // let remoteUrl = "http://www.soundczech.cz/temp/lorem-ipsum.pdf";
    if (this.state.doc !== "#") {
      Linking.openURL(url);
    } else {
      alert("No document found!");
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        <Image
          source={require("../assets/mentorDetailbg.png")}
          style={{
            width: "100%",
            height: 200,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20, 
            resizeMode:'cover'
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            margin: 10,
            position: "absolute",
            top: "20%",
            alignSelf: "center",
            backgroundColor: "#1C6DD0",
            borderRadius: 50,
          }}
        >
          <Avatar
            rounded
            size="large"
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/under18-ff13d.appspot.com/o/Assets%2Fbusiness-man.png?alt=media&token=54c37ff7-e1d2-4489-9068-db6165d3dbce",
            }}
          />
        </View>
        <ScrollView> 
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: "20%",
              alignSelf: "center",
              color: "white",
            }}
          >
            {this.state.mentors.name}
          </Text>
          <Text style={{ color: "grey", alignSelf: "center" }}>
            {this.state.mentors.industry}
          </Text>
          <Text style={{ color: "grey", alignSelf: "center" }}>
            {this.state.mentors.email}
          </Text>

          <Text
            style={{ color: "grey", marginHorizontal: 10, alignSelf: "center" }}
          >
            {this.state.mentors.country}
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 20,
              marginLeft: "5%",
              color: "white",
            }}
          >
            Skills
          </Text>
          <Text style={{ color: "grey", marginHorizontal: "5%" }}>
            {this.state.mentors.skills}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 20,
              marginLeft: "5%",
              color: "white",
            }}
          >
            Experience
          </Text>

          <Text style={{ color: "grey", marginHorizontal: "5%" }}>
            {this.state.mentors.experience}
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 20,
              marginLeft: "5%",
              color: "white",
            }}
          >
            About Me
          </Text>
          <Text style={{ color: "grey", marginHorizontal: "5%" }}>
            {this.state.mentors.description}
          </Text>

          <Text
            style={{
              marginHorizontal: "5%",
              alignSelf: "center",
              marginTop: 30,
              textAlign: "center",
              color: "white",
            }}
          >
            Do you have the ability to become an entrepreneur? Share your SOP
            and let's work together to transform your dreams into reality!
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            {this.state.uploading === true ? (
              this.state.doc ? (
                <Feather name="check-circle" size={20} color="green" />
              ) : (
                <ActivityIndicator color="blue" size="small" />
              )
            ) : (
              <AntDesign name="upload" size={20} color="grey" />
            )}

            <TouchableOpacity
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                this.selectPicture("documents/" + Math.random());
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "grey",
                  fontStyle: "bold",
                  fontFamily: "Comic Sans MS",
                  marginTop: 10,
                }}
              >
                Choose Document
              </Text>
            </TouchableOpacity>
          </View>

          {this.state.doc ? (
            <TouchableOpacity
              onPress={() => {
                //open the modal
                this.setState({ modalvisible: true });
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "grey",
                  fontStyle: "bold",
                  fontFamily: "Comic Sans MS",
                }}
              >
                View Document{" "}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
          <TouchableOpacity
            style={{
              alignSelf: "center",
              marginVertical: 20,
              borderColor: "#1C6DD0",
              borderWidth: 3,
              borderRadius: 5,
              width: "80%",
              backgroundColor: "#1C6DD0",
              padding: 6,
            }}
            onPress={() => {
              if(this.state.doc){
                this.sendRequest();

              }
              else{
                alert('Please upload your SOP')
              }
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontStyle: "bold",
                fontFamily: "Comic Sans MS",
              }}
            >
              Send Request
            </Text>
          </TouchableOpacity>

          <Modal visible={this.state.modalvisible}>
            <View style={{ flex: 1, marginTop: 50 }}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => {
                  this.setState({ modalvisible: false });
                }}
              >
                <Text style={{ alignSelf: "center" }}>Close</Text>
              </TouchableOpacity>
              {this.state.doc ? (
                <PdfReader
                  source={{
                    uri: this.state.doc,
                  }}
                />
              ) : (
                <Text>The document does not exist</Text>
              )}
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    alignItems: "center",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
