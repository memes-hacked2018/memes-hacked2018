import React from 'react';
import { Root, Container, Content, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab } from 'native-base';
import { Font, AppLoading } from "expo";
import { StackNavigator, DrawerNavigator } from "react-navigation";
// import Tabs from "./Tabs.js";

import CreatePage from "./TabPages/CreatePage.js";
import ProfilePage from "./TabPages/ProfilePage.js";
import TagsPage from "./TabPages/TagsPage.js";

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
      selectedTab: "default",
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
      <Header>
        <Body>
          <Title>Memes4Life</Title>
        </Body>
      </Header>
      <Content>
        {this.renderSelectedTab()}
      </Content>
      <Footer>
          <FooterTab>
              <Button active={this.state.selectedTab==='create'} 
               onPress={() => this.setState({selectedTab: 'create'})}>
                  <Icon name="create" />
              </Button>
              <Button active={this.state.selectedTab==='profile'} 
               onPress={() => this.setState({selectedTab: 'profile'})}>
                  <Icon name="person" />
              </Button>
              <Button active={this.state.selectedTab==='tags'} 
               onPress={() => this.setState({selectedTab: 'tags'})}>
                  <Icon name="md-pricetags" />
              </Button>
          </FooterTab>
        </Footer>
    </Container>

    );
  }
}
