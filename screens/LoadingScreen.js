import * as React from 'react';
import {
  Text,
  View,
  Stylesheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends React.Component {
 
 componentDidMount(){
   firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  this.props.navigation.replace('Dashboard')
    var uid = user.uid;
    // ...
  } else {
   this.props.navigation.replace('Login')
  }
});
 }
 
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading....</Text>
      </View>
    );
  }
} 
