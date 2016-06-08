import G from '../../global';
import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native';


export default class ExerciseSelect extends Component {

  render() {
    const { exercises, onSelect } = this.props;
    return (
      <View style={styles.scrollView}>
      <ScrollView

        scrollEventThrottle={200}>
        {exercises.map((ex, key) =>
          <TouchableHighlight
            underlayColor={G.grey}
            key={key}
            style={[G.basicRow, G.thinRow]}
            onPress={onSelect.bind(this, ex)}>
            <View>
              <Text>{ex.exerciseName}</Text>
            </View>
          </TouchableHighlight>
        )}

        </ScrollView>
        </View>
    )
  }

}

ExerciseSelect.PropTypes = {
  exercises: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  scrollView: {
    height: 150,
  },
});
