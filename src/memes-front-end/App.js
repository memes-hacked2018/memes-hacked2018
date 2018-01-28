import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeCards from './SwipeCards.js'
import { Button, Icon } from 'react-native-elements';
import { Container } from 'native-base';
import Tabs from './Tabs.js';
import ReactionButton from './ReactionButton.js';
import ButtonLayer from './ButtonLayer'
import { StyleSheet } from "react-native";
import { Root, Container, Content, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab } from 'native-base';
import { Font, AppLoading } from "expo";
import { StackNavigator, DrawerNavigator } from "react-navigation";
// import Tabs from "./Tabs.js";

import CreatePage from "./TabPages/CreatePage.js";
import ProfilePage from "./TabPages/ProfilePage.js";
import TagsPage from "./TabPages/TagsPage.js";
import TinderPage from "./TabPages/TinderPage.js";

// const ScreenNavigator = StackNavigator({
//   Create: {
//     screen: CreatePage,
//     navigationOptions: {
//       headerTitle: 'Create A Meme',
//     },
//   },
//   Profile: {
//     screen: ProfilePage,
//     navigationOptions: {
//       headerTitle: 'Profile',
//     },
//   },
//   Tags: {
//     screen: TagsPage,
//     navigationOptions: {
//       headerTitle: 'Tags',
//     },
//   }
// })

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedTab: "tinder",
      loading: true 
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  renderSelectedTab () {
    console.log(this.state.selectedTab);
    switch (this.state.selectedTab) {
      case 'create':
        return (<CreatePage />);
        break;
      case 'profile':
        return (<ProfilePage />);
        break;
      case 'tags':
        return (<TagsPage />);
        break;
      case 'tinder':
        return (<TinderPage/>);
        break;
      default:
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Container>
      <Header style={styles.buttonStyle}>
        <Body>
          <Title>Memes4Life</Title>
        </Body>
      </Header>
      <Content>
        {this.renderSelectedTab()}
      </Content>
      <Footer >
          <FooterTab>
            <Button active={this.state.selectedTab==='tinder'} 
              onPress={() => this.setState({selectedTab: 'tinder'})}
              style={styles.buttonStyle}>
                <Icon name="ios-flame" style={styles.iconStyle} />
            </Button>
            <Button active={this.state.selectedTab==='create'} 
              onPress={() => this.setState({selectedTab: 'create'})}
              style={styles.buttonStyle}>
                <Icon name="create" style={styles.iconStyle}/>
            </Button>
            <Button active={this.state.selectedTab==='profile'} 
              onPress={() => this.setState({selectedTab: 'profile'})}
              style={styles.buttonStyle}>
                <Icon name="person" style={styles.iconStyle}/>
            </Button>
            <Button active={this.state.selectedTab==='tags'} 
              onPress={() => this.setState({selectedTab: 'tags'})}
              style={styles.buttonStyle}>
                <Icon name="md-pricetags" style={styles.iconStyle} />
            </Button>
          </FooterTab>
        </Footer>
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
  buttonStyle: {
    backgroundColor: "#60B3BB",
  },
  iconStyle: {
    color: "#000000"
  }
})