import { connect } from 'react-redux';
import WorkoutList from '../WorkoutList/WorkoutList';
import styles from './styles';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class AddWorkout extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>AddWorkout</Text>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user
  })
)(AddWorkout);