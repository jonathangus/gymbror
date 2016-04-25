import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import Reps from '../Reps/Reps';
import { addExerciseSession } from '../../reducers/workouts';
import Back from '../Back/Back';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  Picker,
  TextInput
} from 'react-native';

const defaultValues = [
  {
    reps: 10,
    value: 70
  },
  {
    reps: 10,
    value: 65
  }
];

class AddWorkout extends Component {
  constructor(props) {
    super(props);
    const { selectedExercise } = this.props;
    this.state = {
      selectedExercise: null,
      selectorOpen: true,
    }

    if(selectedExercise.sessions.length == 0) {
      this.state.rows = defaultValues;
    }
    else {
      this.state.rows = selectedExercise.sessions[0].sets;
    }
  }

  onSessionAdded(sets) {
    const { dispatch, user, selectedExercise } = this.props;
    const exerciseId = selectedExercise._id;
    this.props.navigator.push({addWorkout: 1});
    dispatch(addExerciseSession(sets, exerciseId, user.data.userId, selectedExercise.name));
  }
  
  render() {
    const exitIcon = <Back onPress={() => this.props.navigator.push({addWorkout: 1})} />;
    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={exitIcon}
          title={{ title: 'Add ' + this.props.selectedExercise.name + ' exercise' }}/>

        {this.state.rows ? <Reps onComplete={this.onSessionAdded.bind(this)} intialRows={this.state.rows} /> : null}
      </View>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    exercises: state.exercises,
    workouts: state.workouts
  })
)(AddWorkout);