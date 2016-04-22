import { connect } from 'react-redux';
import styles from './styles';
import BrorNavigator from '../BrorNavigator/BrorNavigator';
import { loadExercisesByUser } from '../../reducers/exercises';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import { FBLoginManager } from 'NativeModules';

import React, {
  Component,
  View,
  StatusBar
} from 'react-native';

class App extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props;
    if(user.isLoggedIn) {
      dispatch(loadExercisesByUser());
    }

    // Each time the user is logged in lets update its exercise list
    RCTDeviceEventEmitter.addListener(
      FBLoginManager.Events["Login"],
      () => {
        dispatch(loadExercisesByUser());
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <BrorNavigator />
      </View>
    )
  }
}

export default connect(
  (state) => ({
    user: state.user
  })
)(App);