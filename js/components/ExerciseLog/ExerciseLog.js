import _ from 'lodash';
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  TouchableHighlight,
  TouchableWithoutFeedback,
  PanResponder
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    height: 500
  },
  activeRow: {
    opacity: 0.7
  },
  row: {
    padding: 15,
    backgroundColor: 'white',
  }
});

export default class ExerciseLog extends Component {
  constructor() {
    super();

    const items = [
      {
        text: 'asd',
      },
      {
        text: 'asd1',
      },
      {
        text: 'asd2',
      },
      {
        text: 'asd3',
      },
    ]

    this.state = {
      items: items,
      activeRow: null,
      dropZones: null,
      pan : new Animated.ValueXY()   //Step 1
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: this.handleGrant,
    });
  }


  handleGrant(){
    console.log('HEY');
    //this.refs.box.setNativeProps({
    //  backgroundColor: 'green'
    //});
  }

  _onPanResponderRelease(e, gesture) {
    this.setState({
      activeRow: null
    });

    //_.values(this.refs).forEach((r) => {
    //  r.measure((ox, y, width, height, px, py) => ())
    //});
  }

  _setActiveRow(index) {
    this.setState({
      activeRow: index
    });
  }

  render() {
    const { activeRow, items } = this.state;
    return (
      <View style={styles.container}>
        {items.map((i, key) =>
            <TouchableHighlight
              onLongPress={this._setActiveRow.bind(this, key)}
              style={styles.row}
              {...this.panResponder.panHandlers}
              ref={'row-' + key}>
              <Text>{i.text}</Text>
            </TouchableHighlight>
        )}

      </View>
    )
  }
}