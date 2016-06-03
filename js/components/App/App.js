import { connect } from 'react-redux';
import styles from './styles';
import BrorNavigator from '../BrorNavigator/BrorNavigator';
import { loadExercisesByUser } from '../../reducers/exercises';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import { FBLoginManager } from 'NativeModules';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import { testServer } from '../../api';
import { errorMessage, success } from '../../error_handling';
import AppState from 'AppState';
import { fetchWorkoutsIfNeeded } from '../../reducers/workouts';
import CodePush from 'react-native-code-push';

import React, {
  Component,
  View,
  StatusBar
} from 'react-native';

class App extends Component {
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    // Sync our code
    CodePush.sync({ installMode: CodePush.InstallMode.IMMEDIATE});

    const { dispatch, user } = this.props;

    // Load exercises
    if(user.isLoggedIn) {
      dispatch(loadExercisesByUser());
      dispatch(fetchWorkoutsIfNeeded());
    }

    // Test server
    testServer()
      .catch(() => errorMessage('Server is down', 'gymbror have gone crossfitting'));

    // Each time the user is logged in lets update its exercise list
    RCTDeviceEventEmitter.addListener(
      FBLoginManager.Events["Login"],
      () => {
        setTimeout(() => {
          dispatch(fetchWorkoutsIfNeeded());
          dispatch(loadExercisesByUser())
        }, 300);
      }
    );

    // Take care of messages
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  handleAppStateChange(appState) {
    if (appState === 'active') {
      CodePush.sync({installMode: CodePush.InstallMode.IMMEDIATE});
      testServer()
        .catch(() => errorMessage('Server is down', 'gymbror have gone crossfitting'));
    }
  }

  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <BrorNavigator />
        <MessageBar ref="alert" />
      </View>
    )
  }
}

export default connect(
  (state) => ({
    user: state.user
  })
)(App);
