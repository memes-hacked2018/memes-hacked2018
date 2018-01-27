import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeCards from './SwipeCards.js'
import { Button } from 'react-native-elements';
import Tabs from "./Tabs.js";

export default class App extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Tabs/>
        <Text>This is where the options go to choose your meme</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
