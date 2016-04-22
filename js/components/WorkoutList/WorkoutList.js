import { connect } from 'react-redux';
import { fetchWorkoutsIfNeeded } from '../../reducers/workouts';

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

  render() {
    const { workouts } = this.props;

    return (
      <View>
        <Text>WorkoutList</Text>
        {workouts.items.map((workout, i) => <Text key={i}>{workout.exerciseUnits.join(',')}</Text>)}
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