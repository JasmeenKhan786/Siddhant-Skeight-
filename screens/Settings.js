import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';

export default class SettingsScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            borderWidth: 1,
            width: '30%',
            borderRadius: 5,
            backgroundColor:'#2F89FC'
          }}
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                this.props.navigation.replace('Login');
              })
              .catch((error) => {
                alert('SOmething went wrong! Try again later');
              });
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontStyle: 'bold',
              fontFamily: 'Comic Sans MS',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
