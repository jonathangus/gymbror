import G from '../../global';
import Icon from 'react-native-vector-icons/Entypo';
import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 4,
    paddingLeft: 10,
    paddingRight: 10
  },
});

const underlay = {
  danger: '#c0392b',
  action: G.primary
};

export default class Back extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <TouchableHighlight
          underlayColor={G.grey}
          style={styles.button}
          onPress={this.props.onPress}>
            <Icon
            name="chevron-left"
            size={30}
            backgroundColor="#FFF"
            color='#222222'/>
        </TouchableHighlight>
      </View>
    );
  }
}


