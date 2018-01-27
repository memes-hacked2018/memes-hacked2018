import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from 'react-native-tabs';

export default class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state = {page:'create'};
    }
      
    updateIndex = (index) => {
    this.setState({index})
    }

    render() {
        return(
        <Tabs selected={this.state.page} style={{backgroundColor:'#f9f9f9'}}
            selectedStyle={{color:'#5BDEC3'}} onSelect={el=>this.setState({page:el.props.name})}>
            <Text name="create" selectedIconStyle={{borderTopWidth:2,borderTopColor:'#5BDEC3'}}>Create</Text>
            <Text name="profile" selectedIconStyle={{borderTopWidth:2,borderTopColor:'#5BDEC3'}}>Profile</Text>
            <Text name="Tags" selectedIconStyle={{borderTopWidth:2,borderTopColor:'#5BDEC3'}}>Tags</Text>
        </Tabs>
        )
    }
}
      
      