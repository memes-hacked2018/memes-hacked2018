import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeCards from './SwipeCards.js'
import { Button, Icon } from 'react-native-elements';
import { Container } from 'native-base';
import Tabs from './Tabs.js';
import ReactionButton from './ReactionButton.js';
import ButtonLayer from './ButtonLayer'

export default class App extends React.Component {
  
  render() {
    return (
      <Container style={styles.containerStyle}>
        <SwipeCards/>
        <Tabs/>
        <ButtonLayer/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
