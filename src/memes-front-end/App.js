import React from 'react';
import Tabs from "./Tabs.js";
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

export default class App extends React.Component {
  render() {
    return (
      <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
    </Container>
    );
  }
}
