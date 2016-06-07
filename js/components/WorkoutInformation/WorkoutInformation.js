import NavigationBar from 'react-native-navbar';
import Button from '../Button/Button';
import { deleteWorkout } from '../../actions/workoutActions';
import { connect } from 'react-redux';
import G from '../../global';
import Icon from 'react-native-vector-icons/Entypo';
import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  AlertIOS,
  ScrollView
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: G.grey,
  },
  content: {
    flex:1
  },
  remove: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  name: {
    backgroundColor: G.grey,
    padding:10,
  },
  row: {
    flexDirection: 'row'
  },
  count: {
    color: '#808080',
    width: 35,
  },
  removeButton: {
    flex: 0,
  },
  removeText: {
    color: 'white'
  }
});


class WorkoutInformation extends Component {
    static propTypes = {
      workoutData: React.PropTypes.object.isRequired
    }

    removeWorkout() {
      AlertIOS.alert(
        'Remove workout',
        'Do you really wanna remove this workout?',
        [{
          text: 'Remove', onPress: () => {
            const { dispatch, workoutData, navigator } = this.props;
            dispatch(deleteWorkout(workoutData));
            navigator.push({workoutList: 1});
          }
        },
          {text: 'Cancel'},
        ]
      );
    }

    render() {
      const { workoutData: { sessions } } = this.props;
      return (
        <View style={styles.container}>
          <NavigationBar
            title={{ title: 'Workout information' }}
            leftButton={{
              title: 'Back',
              handler: () => {this.props.navigator.push({workoutList: 1})}
            }}/>
            <View style={styles.content}>
              <ScrollView
                scrollEventThrottle={200}
                showsVerticalScrollIndicator={true}>
                  {sessions.map((unit, i) => {
                    return (
                      <View key={i}>
                        <View style={G.section}>
                          <Text style={G.label}>{unit.exerciseName ? unit.exerciseName.toUpperCase() : 'MISSING NAME'}</Text>
                        </View>
                        {unit.sets.map((set, i) => {
                          return (
                            <View key={i} style={[G.basicRow, styles.row]}>
                              <Text style={[styles.rowItem, styles.count]}>{i}.</Text>
                              <Text>{set.reps}</Text>
                              <Text>{set.value ? ' x ' + set.value : ''}</Text>
                            </View>
                          )
                        })}
                  </View>
                  )
                })}
              </ScrollView>
            </View>
          <View style={styles.remove}>
            <Icon.Button
              style={styles.removeButton}
              onPress={this.removeWorkout.bind(this)}
              name='cross'
              backgroundColor={G.danger}>
              <Text style={styles.removeText}>Remove</Text>
            </Icon.Button>
          </View>
        </View>
      );
  }
}

export default connect(
  (state) => ({
    workouts: state.workouts
  })
)(WorkoutInformation);