import { FBLoginManager } from 'NativeModules';
import { connect } from 'react-redux';
import { logoutUser } from '../../reducers/user';
import WorkoutList from '../WorkoutList/WorkoutList';
import AddWorkout from '../AddWorkout/AddWorkout';
import styles from './styles';

import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';

class Landing extends Component {
  _logoutUser() {
    const { dispatch } = this.props;
    FBLoginManager.logout(function(error, data){
      if (!error) {
       dispatch(logoutUser());
      }
    });
  }

  _addWorkoutView() {
  }

  _exerciseListView() {
    this.props.navigator.push({exerciseList: 1});
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('./arnold.jpg')}
        />

        <WorkoutList />

        <TouchableHighlight style={styles.action} onPress={this._exerciseListView.bind(this)}>
          <Text>Exercises</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.action} onPress={this._addWorkoutView.bind(this)}>
          <Text>AddWorkout</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.action} onPress={this._logoutUser.bind(this)}>
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user
  })
)(Landing);