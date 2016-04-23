import { connect } from 'react-redux';
import { fetchWorkoutsIfNeeded } from '../../reducers/workouts';
import moment from 'moment';
import NavigationBar from 'react-native-navbar';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class WorkoutList extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchWorkoutsIfNeeded());
  }

  goToWorkout(workout) {
    this.props.navigator.push({workoutInformation: 1, workoutData: workout});
  }

  render() {
    const { workouts } = this.props;
    return (
      <View>
        <NavigationBar
          title={{ title: 'Workout information' }}
          leftButton={{
              title: 'Back',
              handler: () => {this.props.navigator.push({})}
            }}/>
        <Text>WorkoutList</Text>
        {workouts.items.map((workout, i) => {
          return <TouchableHighlight key={i} onPress={this.goToWorkout.bind(this, workout)}>
            <Text key={i}>{moment(workout.date).format('dddd, MMMM Do YYYY, h:mm:ss a')}</Text>
          </TouchableHighlight>
        })}
      </View>
    );
  }
}

export default connect(
  (state) => ({
    workouts: state.workouts,
    user: state.user
  })
)(WorkoutList);