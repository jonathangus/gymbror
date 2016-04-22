import { connect } from 'react-redux';
import Landing from '../Landing/Landing';
import Auth from '../Auth/Auth';
import styles from './styles';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class App extends Component {
  render() {
    const { user } = this.props;
    if(user) {
      <View style={styles.container}>
        <Landing />
      </View>
    }
    return (
     <View style={styles.container}>
      <Auth />
     </View>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user
  })
)(App);