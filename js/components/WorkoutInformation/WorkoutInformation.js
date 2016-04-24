import NavigationBar from 'react-native-navbar';
import moment from 'moment';
import Button from '../Button/Button';
import { deleteWorkout } from '../../reducers/workouts';
import { connect } from 'react-redux';
import G from '../../global';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  AlertIOS
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex:1
  },
  remove: {
    marginBottom: 30
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
    paddingRight: 8
  },
  nav: {
    backgroundColor: 'red'
  }
});


class WorkoutInformation extends Component {

    removeWorkout() {
      AlertIOS.alert(
        'Remove workout',
        'Do you really wanna remove this workout?',
        [{
          text: 'Remove', onPress: () => {
            const { dispatch, workoutData, navigator } = this.props;
            dispatch(deleteWorkout(workoutData._id));
            navigator.push({workoutList: 1});
          }
        },
          {text: 'Cancel'},
        ]
      );
    }

    render() {
      const { workoutData } = this.props;
      return (
        <View style={styles.container}>
          <NavigationBar
            title={{ title: 'Workout information' }}
            leftButton={{
              title: 'Back',
              handler: () => {this.props.navigator.push({workoutList: 1})}
            }}/>
            <View style={styles.content}>
            {workoutData.exerciseUnits ? workoutData.exerciseUnits.map((unit, i) => {
              return (
                <View key={i}>
                  <Text style={styles.name}>{unit.exercise.name}</Text>
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
            }): null}
            </View>
          <View style={styles.remove}>
            <Button type={'danger'} onPress={this.removeWorkout.bind(this)}>Remove</Button>
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