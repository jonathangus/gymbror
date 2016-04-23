import { FBLoginManager } from 'NativeModules';
import { connect } from 'react-redux';
import { logoutUser } from '../../reducers/user';
import AddWorkout from '../AddWorkout/AddWorkout';
import styles from './styles';
import NavigationBar from 'react-native-navbar';

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


  _exerciseListView() {
    this.props.navigator.push({exerciseList: 1});
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'Gymbror' }}
          rightButton={{
            title: 'Logout',
            handler: this._logoutUser.bind(this)
          }}/>
        <Image
          style={styles.image}
          source={require('./arnold.jpg')}
        />

        <View style={styles.actions}>
          <TouchableHighlight underlayColor="#F3F5F9"  style={styles.action} onPress={() => this.props.navigator.push({workoutList: 1})}>
            <Text>Completed Workouts</Text>
          </TouchableHighlight>

          <TouchableHighlight underlayColor="#F3F5F9" style={styles.action} onPress={this._exerciseListView.bind(this)}>
            <Text>Exercises</Text>
          </TouchableHighlight>

          <TouchableHighlight underlayColor="#F3F5F9"  style={styles.action} onPress={() => this.props.navigator.push({addWorkout: 1})}>
            <Text>Add workout</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user
  })
)(Landing);