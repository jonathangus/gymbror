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
    const { exercises, workouts, selectedSession } = this.props;
    const currentExercise = exercises.exercisesFromUser.filter(ex => ex._id == selectedSession.exerciseId);
    let rows;

    if(selectedSession.sets && selectedSession.sets.length > 0) {
      rows = selectedSession.sets;
    }
    else if(currentExercise.sessions.length > 0) {
      rows = selectedExercise.sessions[0].sets;
    }
    else {
      rows = defaultValues;
    }

    this.state = {
      rows: rows
    };
    
    console.log(this.state.rows);

  //const selectedExercise = _.find(exercises.exercisesFromUser, {'_id': exerciseId});
  //navigator.push({EditExerciseSession: 1, selectedExercise: selectedExercise});

  }

  onSessionAdded() {

  }



  render() {
    const { selectedSession } = this.props;
    const exitIcon = <Back onPress={() => this.props.navigator.push({addWorkout: 1})} />;

    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={exitIcon}
          title={{ title: selectedSession.name }}/>
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