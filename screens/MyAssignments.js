import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TextInput,
  ImageBackground,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import PdfReader from "rn-pdf-reader-js";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";

export default class MyAssignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: "",
      modalvisible: false,
      assignments: [],
      uploading: false,
      userId: firebase.auth().currentUser.email,
      comments: "",
      currentId: "",
      modalvisible2: false,
      viewDoc: "",
    };
  }

  getAssignments = async () => {
    this.setState({ assignments: [] });
    var resp = await db
      .collection("assignments")
      .where("menteeEmail", "==", this.state.userId)
      .get();
    resp.docs.map((d) => {
      var temp = this.state.assignments;
      var data = d.data();
      data.id = d.id;
      temp.push(data);
      this.setState({ assignments: temp });
    });
  };
  componentDidMount() {
    this.getAssignments();
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

  updateAssignment = (doc, id) => {
    db.collection("assignments").doc(id).update({
      responseDoc: doc,
      status: "Completed",
    });
    alert("SuccessFully Submitted!");
    this.getAssignments();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <ImageBackground
          source={require("../assets/design.png")}
          style={{ flex: 1, resizeMode: "cover" }}
        >
          <TouchableOpacity
            style={{ marginLeft: 15, marginTop: 15 }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "bold",
              marginTop: "15%",
              alignSelf: "center",
              marginRight: 25,
            }}
          >
            My Assignments
          </Text>

          <ScrollView>
            {this.state.assignments.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginHorizontal: 30,
                    marginTop: "30%",
                    fontSize: 16,
                  }}
                >
                  No Assignments Recieved Yet! Go ahead and send your SOPs to
                  Mentors!
                </Text>
              </View>
            ) : (
              this.state.assignments.map((p) => {
                return (
                  <View
                  key={p.id}
                    style={{
                      borderWidth: 1,
                      marginTop: 15,
                      backgroundColor: "#7F7CFF",
                      width: "80%",
                      alignSelf: "center",
                      borderRadius: 10,
                      height: 100,
                      shadowOffset: {
                        width: 5,
                        height: 5,
                      },
                      padding:10,
                      shadowOpacity: 0.5,
                      shadowRadius: 10,
                      shadowColor: "#000",
                      elevation: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: '600',
                        fontFamily: "Comic Sans MS",
                        marginLeft:'5%'
                      }}
                    >
                     Comments: {p.mentorComments}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: '600',
                        fontFamily: "Comic Sans MS",
                        marginLeft:'5%' 
                      }}
                    >
                      Status: {p.status}
                    </Text>
                    <View style={{flexDirection:'row',marginTop:10, justifyContent:'space-around'}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 5,
                        width: "50%",
                        alignSelf: "center",
                      }}
                      onPress={() => {
                        this.setState({
                          modalvisible: true,
                          currentId: p.id,
                        });
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          fontWeight: "bold",
                          color: "#000",
                          fontSize: 13,
                        }}
                      >
                        Submit Assignment
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        width: "35%",
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        borderRadius: 5,
                        justifyContent:'center',
                        alignItems:'center'
                      }}
                      onPress={() => {
                        this.setState({
                          modalvisible2: true,
                          viewDoc: p.assignmentDoc, 
                        });
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>View Task</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            )}

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalvisible}
            >
              <View
                style={{
                  backgroundColor: "#4740B2",
                  width: "100%",
                  height: 700,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      modalvisible: false,
                    });
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                      fontSize: 18,
                      marginTop: 15,
                      marginLeft: 15,
                    }}
                  >
                    X
                  </Text>
                </TouchableOpacity>

                {this.state.uploading === true ? (
                  this.state.doc ? (
                    <Feather
                      style={{
                        alignSelf: "center",
                        marginRight: 10,
                        marginTop: 50,
                      }}
                      name="check-circle"
                      size={24}
                      color="white"
                    />
                  ) : (
                    <ActivityIndicator
                      style={{
                        alignSelf: "center",
                        marginRight: 10,
                        marginTop: 50,
                      }}
                      color="white"
                      size="small"
                    />
                  )
                ) : (
                  <AntDesign
                    style={{
                      alignSelf: "center",
                      marginRight: 10,
                      marginTop: 50,
                    }}
                    name="upload"
                    size={24}
                    color="white"
                  />
                )}

                <TouchableOpacity
                  onPress={() => {
                    this.selectPicture("submission/" + Math.random());
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: '700',
                      fontFamily: "Comic Sans MS",
                      marginTop: 5,
                      alignSelf: "center",
                      marginRight: 5,
                    }}
                  >
                    Choose Document
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.updateAssignment(this.state.doc, this.state.currentId);
                    this.setState({
                      modalvisible: false,
                    });
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: '700',
                      fontFamily: "Comic Sans MS",
                      marginTop: 25,
                      alignSelf: "center",
                      marginRight: 10,
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal visible={this.state.modalvisible2}>
              <View style={{ flex: 1, marginTop: 50 }}>
                <TouchableOpacity
                  style={{ margin: 10 }}
                  onPress={() => {
                    this.setState({ modalvisible2: false });
                  }}
                >
                  <Text style={{ alignSelf: "center" }}>Close</Text>
                </TouchableOpacity>
                {this.state.viewDoc ? (
                  <PdfReader
                    source={{
                      uri: this.state.viewDoc,
                    }}
                  />
                ) : (
                  <Text>The document does not exist</Text>
                )}
              </View>
            </Modal>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
