import { StyleSheet, Text, View } from 'react-native';
import { Button, Container } from 'native-base';
import React from 'react';

export default class ButtonLayer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container style={styles.containerStyle}>
                <Button rounded large style={styles.buttonStyle}>
                    <Text>Stank</Text>
                </Button>
                <Button rounded large style={styles.buttonStyle}>
                    <Text>Dank</Text>
                </Button>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonStyle: {
        top: 300,
        marginLeft: 10,
        marginRight: 10
    }
})