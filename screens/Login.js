import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import db from '../config';
import firebase from 'firebase';

//Main axis - justifyContent
//Cross axis  - alignItems

//width height, alignSlef, justifycontent, alignitems, margin and padding
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  login = async() => {
 

   var response = await db.collection('users').where('email','==',this.state.email).get();
   if(response.docs.length === 1){
 firebase
      .auth() 
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCrendential) => {
        Alert.alert('Successfully Login');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(error.errorMessage);
      });
   }
   else{
     alert('Sorry the user is not a Student!')
   }

   
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text
            style={{
              marginTop: '15%',
              marginLeft: '5%',
              fontSize: 22,
              fontWeight: 'bold',
              color: 'blue',
            }}>
            Welcome Back 👋
          </Text>

          <Text style={{ marginLeft: '5%', marginTop: 15, color: 'grey' }}>
            I am so happy to see you. Please login to continue & Enjoy the
            Experience.
          </Text>

          <TextInput
            style={{
              backgroundColor: '#ccc',
              marginTop: 60,
              width: '90%',
              height: 40,
              alignSelf: 'center',
              borderRadius: 10,
              paddingLeft: 10,
            }}
            placeholder="Email"
            onChangeText={(val) => {
              this.setState({ email: val });
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 30,
              width: '90%',
              height: 40,
              justifyContent: 'space-between', 
            }}>
            <TextInput
              style={{
                backgroundColor: '#ccc',
                width: '80%',
                borderRadius: 10,
                paddingLeft: 10,
              }}
              secureTextEntry={true}

              placeholder="Password"
              onChangeText={(val) => {
                this.setState({ password: val });
              }}
            />
            <TouchableOpacity onPress={()=>{
              alert('Coming Soon!')
            }}
              style={{
                borderWidth: 1,
                width: '15%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'blue',
              }}>
              <Ionicons name="finger-print" size={24} color="blue" />
            </TouchableOpacity>
          </View>

          <Text
            style={{ alignSelf: 'flex-end', marginTop: 20, marginRight: '5%' }}
            onPress={() => {
              this.props.navigation.replace('Reset');
            }}>
            <Text style={{ color: 'blue' }}> Forgot Password </Text>
          </Text>

          <TouchableOpacity
            onPress={() => {
              if (this.state.email && this.state.password) {
                this.login();
              } else {
                alert('Please fill all the details!');
              }
            }}
            style={{
              backgroundColor: 'blue',
              borderRadius: 10,
              width: '90%',
              height: 40,
              alignSelf: 'center',
              marginTop: 80,
              justifyContent: 'center',
              elevation: 10,
              shadowOffset: {
                width: 3,
                height: 3,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              shadowColor: 'blue',
            }}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>

          <Text
            style={{ alignSelf: 'center', marginTop: 40 }}
            onPress={() => {
              this.props.navigation.replace('SignUp');
            }}>
            Don't have an Account?{' '}
            <Text style={{ color: 'blue', fontWeight: 'bold' }}> Sign Up </Text>
          </Text>
        </ScrollView>
      </View>
    );
  }
}
