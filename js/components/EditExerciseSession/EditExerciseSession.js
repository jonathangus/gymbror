import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import Reps from '../Reps/Reps';
import { addExerciseSession, editExerciseSession } from '../../actions/workoutActions';
import Back from '../Back/Back';
import React, { Component } from 'react';
import { uuid, mapSessions } from '../../util';

import {
  Text,
  View,
  TouchableHighlight,
  Picker,
  TextInput
} from 'react-native';

const defaultValues = [
  {
    reps: 10,
    value: 0
  }
];

class EditExerciseSession extends Component {
  constructor(props) {
    super(props);
    const { selectedExercise, selectedSession, sessions } = this.props;
    this.state = {
      selectedExercise: null,
      selectorOpen: true,
      selectedType: selectedExercise ? selectedExercise.type : selectedSession.type,
      exerciseName: selectedExercise ? selectedExercise.exerciseName : selectedSession.exerciseName,
      newInstance: selectedExercise ? true : false
    }

    const mappedSessions = selectedExercise ? mapSessions(sessions, '_exerciseId', selectedExercise._brorId) : null;

    if(selectedSession && selectedSession.sets) {
      this.state.rows = selectedSession.sets;
    }
    else if(!selectedExercise || mappedSessions.length == 0) {
      this.state.rows = defaultValues;
    }
    else if(selectedExercise) {
      this.state.rows = mappedSessions[0].sets;
    }
  }

  onSessionEdit(sets) {
    const { editExerciseSession, selectedSession } = this.props;
    let updatedSession = Object.assign({}, selectedSession);
    updatedSession.sets = sets;

    editExerciseSession(updatedSession);
    this.props.navigator.push({addWorkout: 1});
  }

  onSessionAdded(sets) {
    const { addExerciseSession, user, navigator, selectedExercise } = this.props;
    const { selectedType, exerciseName } = this.state;
    const exerciseId = selectedExercise._brorId;
    navigator.push({addWorkout: 1});
    const newSession = {
      sets: sets,
      _exerciseId: exerciseId,
      userId: user.data.userId,
      exerciseName: exerciseName,
      type: selectedType,
      _brorId: uuid()
    }
    addExerciseSession(newSession);
  }

  render() {
    const exitIcon = <Back onPress={() => this.props.navigator.push({addWorkout: 1})} />;
    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={exitIcon}
          title={{ title: (this.state.newInstance ? 'Add ' : 'Edit ') + this.state.exerciseName + ' exercise' }}
        />

        {this.state.rows ?
          <Reps
            onComplete={this.state.newInstance ? this.onSessionAdded.bind(this) : this.onSessionEdit.bind(this)}
            intialRows={this.state.rows}
            type={this.state.selectedType}
          />
        : null}
      </View>
    );
  }
}

EditExerciseSession.defaultProps = {
  selectedSession: null,
  selectedExercise: null
}

export default connect(
  (state) => ({
    user: state.user,
    exercises: state.exercises,
    workouts: state.workouts,
    sessions: state.sessions
  }),
  { addExerciseSession, editExerciseSession}
)(EditExerciseSession);
