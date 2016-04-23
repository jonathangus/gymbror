import { connect } from 'react-redux';
import WorkoutList from '../WorkoutList/WorkoutList';
import styles from './styles';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Entypo';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  Picker
} from 'react-native';

class AddWorkout extends Component {
  render() {
    const exitIcon = <TouchableHighlight style={styles.closeButton} onPress={() => this.props.navigator.push({})}><Icon
      name="cross"
      size={30}
      backgroundColor="#FFF"
      color='#35BAF2'
    ></Icon></TouchableHighlight>;

    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'Add new workout' }}
          leftButton={exitIcon}/>
        <TouchableHighlight onPress={() => this.props.navigator.push({AddExerciseSession: 1})}><Text>Add exercise</Text></TouchableHighlight>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    exercises: state.exercises
  })
)(AddWorkout);