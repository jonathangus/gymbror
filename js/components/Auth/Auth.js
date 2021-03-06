import Video from 'react-native-video';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { connect } from 'react-redux';
import styles from './styles';
import { setUser, logoutUser } from '../../reducers/user';
import React, { Component } from 'react';

import {
  View
} from 'react-native';

class Auth extends Component {
  constructor(props) {
    super(props);
  }

  onLogin(data) {
    const { dispatch } = this.props;
    dispatch(setUser(data.credentials));
  }

  onLogout() {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    return (
      <View style={styles.container}>
        <Video source={{uri: 'background'}}
          style={styles.backgroundVideo}
          rate={1} volume={1} muted={true}
          resizeMode='cover' repeat={true} key='video1' />

        <View style={styles.loginContainer}>
          <FBLogin
            permissions={['email','user_friends']}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            onLogin={this.onLogin.bind(this)}
            onLogout={this.onLogout.bind(this)} />
        </View>
      </View>
    )
  }
}

export default connect(
  (state) => ({
    user: state.user
  })
)(Auth);