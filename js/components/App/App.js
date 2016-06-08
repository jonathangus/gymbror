import { connect } from 'react-redux';
import styles from './styles';
import BrorNavigator from '../BrorNavigator/BrorNavigator';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import { FBLoginManager } from 'NativeModules';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import AppState from 'AppState';
import CodePush from 'react-native-code-push';
import React, { Component } from 'react';
import NetConnection from '../NetConnection/NetConnection';
import { syncDataFromServer } from '../../actions/syncActions';

import {
  View,
  StatusBar
} from 'react-native';

class App extends Component {
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));

    // Sync our code
    CodePush.sync({ installMode: CodePush.InstallMode.IMMEDIATE});


    const { user, syncDataFromServer } = this.props;

    // Sync data for logged in users.
    if(user.isLoggedIn) {
      syncDataFromServer();
    }

    // Each time the user is logged in lets update its exercise list
    RCTDeviceEventEmitter.addListener(
      FBLoginManager.Events["Login"],
      () => {
        setTimeout(() => {
          //dispatch(fetchWorkoutsIfNeeded());
        }, 300);
      }
    );

    // Take care of messages
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  handleAppStateChange(appState) {
    if (appState === 'active') {
      CodePush.sync({installMode: CodePush.InstallMode.IMMEDIATE});
      const { syncDataFromServer } = this.props;
      syncDataFromServer();
    }
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <NetConnection />
        <BrorNavigator />
        <MessageBar ref="alert" />
      </View>
    )
  }
}

export default connect(
  (state) => ({
    user: state.user
  }),
  { syncDataFromServer }
)(App);
