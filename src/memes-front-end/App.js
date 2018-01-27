import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeCards from './SwipeCards.js'

export default class App extends React.Component {
  render() {
    return (
      <SwipeCards style={{flex: 1}} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
