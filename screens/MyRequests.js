import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import PdfReader from 'rn-pdf-reader-js';
import { AntDesign } from '@expo/vector-icons';

export default class MyRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: '',
      modalvisible: false,
      mentee: [],
    };
  }
 
  getMentees = async () => {
    this.setState({ mentee: [] });
    var resp = await db
      .collection('request')
      .where('menteeEmail', '==', firebase.auth().currentUser.email)
      .get();
    resp.docs.map((d) => {
      var temp = this.state.mentee;
      var data = d.data();
      data.id = d.id;
      temp.push(data);
      this.setState({ mentee: temp });
    });
  };

  componentDidMount() {
    this.getMentees();
  }

  render() {
    if (this.state.mentee.length === 0) {
      return (
        <View style={{ 
            flex: 1,
            backgroundColor: '#121212',
          }}>
        <ImageBackground   source={require('../assets/design.png')}
            style={{ flex: 1, resizeMode: 'cover' }}>
          <Text style={{
              color: '#000',
                          alignSelf: 'center',
                          paddingTop: 5,
                          paddingRight: 4,
                          fontWeight:'bold',
                          marginTop:200,
                          fontSize:15
          }}> No requests Found </Text>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#121212',
          }}>
          <ImageBackground
            source={require('../assets/design.png')}
            style={{ flex: 1, resizeMode: 'cover' }}>
                <Text style={{color:'white', fontSize:22, fontWeight:'bold', marginTop:'15%', alignSelf:'center',marginRight:25,}}>My Requests</Text>
            <ScrollView>
              {this.state.mentee.map((b) => {
                var component; 
               
                  component = (
                    <View>
                      <Text style={{
                          color: '#fff',
                          alignSelf: 'center',
                          fontWeight:'bold', 
                          marginTop:10
                      }}> Status: {b.status}</Text>
                    </View>
                  );  
                

                return (
                  <View
                  key={b.id}
                    style={{
                      width: '80%',
                      height: 140,
                      alignSelf: 'center',
                      justifyContent:'center',
                      alignItems:'center',
                      marginTop:20,
                      backgroundColor: '#625ED8',
                      borderRadius: 10,
                      shadowOffset: {
                        width: 10,
                        height: 10,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 5,
                      shadowColor: '#000',
                    }}>
                      <Text  style={{
                          color: '#fff',
                          alignSelf: 'center',
                          fontWeight:'bold'
                      }}>{b.mentorName}</Text>

                      <Text  style={{ 
                          color: '#ccc',
                          alignSelf: 'center',
                      }}>{b.mentorEmail}</Text>
                    <TouchableOpacity
                      style={{
                        width: '32%',
                        height: 30,
                        backgroundColor: '#fff',
                        alignSelf: 'center',
                        borderRadius: 10,
                        shadowOffset: {
                          width: 5,
                          height: 5,
                        },
                        marginTop:10,
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        marginRight:5
                      }}
                      onPress={() => {
                        this.setState({ doc: b.menteeSOP, modalvisible: true });
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          alignSelf: 'center',
                          paddingTop: 5,
                          paddingRight: 4,
                          fontWeight:'bold'
                        }}>
                        Open S.O.P
                      </Text>
                    </TouchableOpacity>
                    {component}
                  </View>
                );
              })}
            </ScrollView>
          </ImageBackground>

          <Modal visible={this.state.modalvisible}>
            <View style={{ flex: 1, marginTop: 50 }}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => {
                  this.setState({ modalvisible: false });
                }}>
                <Text style={{ alignSelf: 'center',fontWeight:'bold'}}>Close</Text>
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
        </View>
      );
    }
  }
}
