import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigation/navigate'
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Comic Sans MS": require("./assets/ComicSansMS3.ttf"),
};


export default class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      fontsLoaded: false
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() { 
    this._loadFontsAsync();
  }
  render(){ 
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else { 
  return (
   <NavigationContainer> 
        <MainStack/>  
   </NavigationContainer>
  );
  }
}
} 
  