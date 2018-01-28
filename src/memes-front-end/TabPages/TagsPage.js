import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class TagsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {page:'default'};
    }
  
    render() {
        return (
            <Text>This is the user tags page</Text>
        );
    }
}

