import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';

import firebase from 'firebase';
import db from '../config';
export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      contact: '',
      skills: '',
      description: '',
      country: '',
      image: '',
      email: firebase.auth().currentUser.email,
      id: '',
    };
  }
  getProfile = async () => {
    var temp = await db
      .collection('users')
      .where('email', '==', this.state.email)
      .get();

    temp.docs.map((doc) => {
      var obj = doc.data();
      this.setState({
        image: obj.image,
        name: obj.name,
        contact: obj.contact,
        skills: obj.skills,
        description: obj.description,
        country: obj.country,
        id: doc.id,
      });
    });
  };

  componentDidMount = () => {
    this.getProfile();
  };
  onSubmit = () => {
    db.collection('users').doc(this.state.id).update({
      name: this.state.name,
      contact: this.state.contact,
      skills: this.state.skills,
      description: this.state.description,
      country: this.state.country,
    });
    alert('Changes Saved!')
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        

        </View>
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
            }}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/under18-ff13d.appspot.com/o/Assets%2Fstudent.png?alt=media&token=532a84f2-a57b-4577-9725-38706e0e3c34',
              }}
            />
          </View>
          <Text
            style={{
              paddingLeft: 40,
              fontWeight: 'bold',
              fontFamily: 'Comic Sans MS',
            }}>
            Contact
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: '80%',
              alignSelf: 'center',
              height: 30,
              backgroundColor: '#fff',
              borderColor: '#577BC1',
              paddingLeft: 10,
            }}
            placeholder="9645545676"
            value={this.state.contact}
            onChangeText={(val) => {
              this.setState({ contact: val });
            }}
          />

          <Text
            style={{
              paddingLeft: 40,
              fontWeight: 'bold',
              marginTop: 20,
              fontFamily: 'Comic Sans MS',
            }}>
            Name
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: '80%',
              alignSelf: 'center',
              height: 30,
              backgroundColor: '#fff',
              borderColor: '#577BC1',
              paddingLeft: 10,
            }}
            value={this.state.name}
            placeholder="Sid Sethi"
            onChangeText={(val) => {
              this.setState({ name: val });
            }}
          />

          <Text
            style={{
              paddingLeft: 40,
              fontWeight: 'bold',
              marginTop: 20,
              fontFamily: 'Comic Sans MS',
            }}>
            Email
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: '80%',
              alignSelf: 'center',
              height: 30,
              backgroundColor: '#fff',
              borderColor: '#577BC1',
              paddingLeft: 10,
            }}
            editable={true}
            value={this.state.email}
            placeholder="siddhantsethi@gmail.com"
          />
          <Text
            style={{
              paddingLeft: 40,
              fontWeight: 'bold',
              marginTop: 20,
              fontFamily: 'Comic Sans MS',
            }}>
            Skills
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: '80%',
              alignSelf: 'center',
              height: 30,
              backgroundColor: '#fff',
              borderColor: '#577BC1',
              paddingLeft: 10,
            }}
            value={this.state.skills}
            placeholder="Designer,It,Doctor"
            onChangeText={(val) => {
              this.setState({ skills: val });
            }}
          />
        
        <Text
            style={{
              paddingLeft: 40,
              fontWeight: 'bold',
              marginTop: 20,
              fontFamily: 'Comic Sans MS',
            }}>
            Country
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: '80%',
              alignSelf: 'center',
              height: 30,
              backgroundColor: '#fff',
              borderColor: '#577BC1',
              paddingLeft: 10,
            }}
            value={this.state.country}
            placeholder="India"
            onChangeText={(val) => {
              this.setState({ country: val });
            }}
          />

         <Text
            style={{
              paddingLeft: 40,
              fontWeight: 'bold',
              marginTop: 20,
              fontFamily: 'Comic Sans MS',
            }}>
            Description
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: '80%',
              alignSelf: 'center',
              height: 30,
              backgroundColor: '#fff',
              borderColor: '#577BC1',
              paddingLeft: 10,
            }}
            value={this.state.description}
            placeholder="Working on my Dreams."
            onChangeText={(val) => {
              this.setState({ description : val });
            }}
          />

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginTop: 30,
              borderColor: '#1C6DD0',
              borderWidth: 1,
              borderRadius: 5,
              width: '40%',
              backgroundColor: '#1C6DD0',
              padding: 6,
               shadowOffset: {
                width: 5,
                height: 5,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              shadowColor: '#0F00FF',
          }}
            onPress={this.onSubmit}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Comic Sans MS',
              }}>
              Confirm
            </Text>


            
          </TouchableOpacity>

 <TouchableOpacity
          style={{
            alignSelf: 'center',
              marginTop: 30,
              borderColor: '#1C6DD0',
              borderWidth: 1,
              borderRadius: 5,
              width: '40%',
              backgroundColor: '#1C6DD0',
              padding: 6,
               shadowOffset: {
                width: 5,
                height: 5,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              shadowColor: '#0F00FF',
          }}
          onPress={()=>{
            firebase.auth().signOut().then(() => {
  // Sign-out successful. t
  this.props.navigation.replace('Login')
}).catch((error) => {
  // An error happened.
});
          }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Logout</Text>
        </TouchableOpacity>

        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FBFBFB"
  },
  header: {
    width: '100%',
    height: 80,
    paddingTop: 36,
    paddingHorizontal: 20,
    backgroundColor: '#2D46B9',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Comic Sans MS',
    marginRight:125
  },
});
