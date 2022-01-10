import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
export default class MentorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      industry: this.props.route.params.industry,
      mentors: [],
      id: this.props.route.params.id,
    };
  }

  getMentors = async () => {
    var resp = await db
      .collection("mentor")
      .where("industry", "==", this.state.industry)
      .get();
    resp.docs.map((d) => {
      var temp = this.state.mentors;
      var data = d.data();
      data.id = d.id;
      temp.push(data);
      this.setState({ mentors: temp });
    });
  };
  componentDidMount() {
    this.getMentors();
  }
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
          <ScrollView>
            <TouchableOpacity
              style={{
                marginTop: 40,
                marginLeft: 20,
              }}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>

            <Text
              style={{
                fontWeight: "400",
                fontSize: 22,
                marginTop: 10,
                color: "#fff",
                alignSelf:'center'
              }}
            >
              Explore Mentors
            </Text>

            <View
              style={{
                marginTop: 20,
                width:'100%',
                alignSelf:'center',
                alignItems:'center'
              }}
            >
              <View
                style={{
                  backgroundColor: "#625ED8",
                  borderRadius: 5,
                  width: "80%",
                  flexDirection: "row",
                  height: 35,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather name="search" size={24} color="#fff" />

                <TextInput
                  style={{ height: 40, width: "85%", paddingLeft: 10 }}
                  placeholder="Search"
                  placeholderTextColor="#fff"
                />
              </View>
            </View>

            {this.state.mentors.length === 0 ? (
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', marginTop:50}}>No Mentors found for this industry</Text>
              </View>
            ) : (
              this.state.mentors.map((b) => {
                return (
                  <TouchableOpacity
                  key={b.id}
                    style={{
                      width: "80%",
                      height: 140,
                      alignSelf: "center",
                      backgroundColor: "#7F7CFF",
                      marginTop: 40,
                      borderRadius: 10,
                      flexDirection:'row',
                      justifyContent:'space-evenly',
                      alignItems:'center'
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("MentorDetails", {
                        id: b.id,
                      });
                    }}
                  >
                    <Image
                      source={{ uri: b.image }}
                      style={{
                        width: 50,
                        height: 60,
                        borderRadius: 20,
                        
                      }}
                    />
                    <View>
                    <Text
                      style={{
                       color:'white',
                       fontSize:18
                      }}
                    >
                      {b.name}
                    </Text>
                    <Text
                      style={{
                      color:'white'
                      }}
                    >
                      {b.email}
                    </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
