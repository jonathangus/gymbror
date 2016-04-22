import { FBLoginManager } from 'NativeModules';
import { connect } from 'react-redux';
import { logoutUser } from '../../reducers/user';
import WorkoutList from '../WorkoutList/WorkoutList';
import styles from './styles';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class Landing extends Component {
  _logoutUser() {
    const { dispatch } = this.props;
    FBLoginManager.logout(function(error, data){
      if (!error) {
       dispatch(logoutUser());
      } else {
        console.log(error, data);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Landing</Text>

        <WorkoutList />

        <TouchableHighlight style={styles.logout} onPress={this._logoutUser.bind(this)}>
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