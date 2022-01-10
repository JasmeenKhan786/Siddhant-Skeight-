 import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons'; 

 
//Array
//Map and ScrollView  
//Flatlist
 
const industry = [
  { id: '01', name: 'Technology', image: require('../assets/tech.png') },
  { id: '02', name: 'Education', image: require('../assets/edu.png') },
  { id: '03', name: 'Social', image: require('../assets/social.png') },
  { id: '04', name: 'Automobile', image: require('../assets/auto.png') },
  { id: '05', name: 'AgriTech', image: require('../assets/agri.png') },
  { id: '06', name: 'Consulting', image: require('../assets/consult.png') },
  { id: '07', name: 'Ecommerce', image: require('../assets/ecommerce.png') },
  { id: '08', name: 'Food', image: require('../assets/food.png') },
];

export default class DashboardScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            marginTop: 40,
            fontFamily: 'Comic Sans MS',
            marginRight:20
          }}>
          Skeight
        </Text>
        
        <ScrollView
          contentContainerStyle={{
            backgroundColor: '#362F41',
            marginTop: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              marginTop: 20,
              marginLeft: '5%',
              fontWeight:'600'
            }}>
            Start Your Start-Up Journey
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
              marginTop: 20,
            }}>
            <View
              style={{
                backgroundColor: '#2C2535',
                borderRadius: 10,
                width: '80%',
                flexDirection: 'row',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather name="search" size={24} color="grey" />

              <TextInput
                style={{ height: 40, width: '85%', paddingLeft: 10 }}
                placeholder="Search"
                placeholderTextColor="grey"
              />
            </View>
            <View
              style={{
                backgroundColor: '#2C2535',
                width: 40,
                height: 40,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather name="filter" size={24} color="grey" />
            </View>
          </View> 

          <Text style={{color:'white', marginLeft:'5%', marginTop:30, fontSize:16, fontWeight:'600'}}>Pick Your Industry</Text>

          <ScrollView>
            {industry.map((a) => {
              return (
                <TouchableOpacity
                key={a.id}
                  style={{
                    width: '80%',
                    height: 150,
                    backgroundColor: 'pink',
                    marginTop: 20,
                    alignSelf: 'center',
                    borderRadius: 10,
                    shadowOffset: {
                      width: 10,
                      height: 10,
                    },
                    shadowOpacity: 0.67,
                    shadowRadius: 10,
                    shadowColor: '#000',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('MentorList', {
                      industry: a.name,
                    });
                  }}>
                  <ImageBackground
                    source={a.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 23,
                        fontWeight: 'bold',
                        fontFamily: 'Comic Sans MS',
                        paddingRight: 20,
                        paddingTop:50,
                        alignSelf:'center',
                      }}>
                      {a.name}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}
