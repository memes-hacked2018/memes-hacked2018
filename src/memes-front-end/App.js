import React from 'react';
import Tabs from "./Tabs.js";
import { Root, Container, Header, Title, Button, Left, Right, Body, Icon, Footer } from 'native-base';
import { Font, AppLoading } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
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
          <Title>Header</Title>
        </Body>
        <Right />
        <Footer>
          <Tabs/>
        </Footer>
      </Header>
    </Container>
    );
  }
}
