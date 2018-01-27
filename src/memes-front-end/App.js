import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ItemsToDisplay from "./utilities/ItemsToDisplay"
import User from "./models/User";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {
                    ItemsToDisplay.getItemsToDisplay(new User("a").getRatings(), "Maymay").map((item) => {
                        return <Text>{item}</Text>;
                    })
                }
            </View>
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
