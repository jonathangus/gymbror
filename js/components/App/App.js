import { connect } from 'react-redux';
import styles from './styles';
import BrorNavigator from '../BrorNavigator/BrorNavigator';
import { loadExercisesByUser } from '../../reducers/exercises';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import { FBLoginManager } from 'NativeModules';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import React, {
  Component,
  View,
  StatusBar
} from 'react-native';

class App extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props;
    // Load exercises
    if(user.isLoggedIn) {
      dispatch(loadExercisesByUser());
    }

    // Each time the user is logged in lets update its exercise list
    RCTDeviceEventEmitter.addListener(
      FBLoginManager.Events["Login"],
      () => {
        setTimeout(() => dispatch(loadExercisesByUser()), 300);
      }
    );

    // Take care of messages
    MessageBarManager.registerMessageBar(this.refs.alert);
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