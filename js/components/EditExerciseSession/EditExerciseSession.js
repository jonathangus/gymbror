import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import Reps from '../Reps/Reps';
import { addExerciseSession, editExerciseSession } from '../../reducers/workouts';
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
    value: ''
  }
];

class EditExerciseSession extends Component {
  constructor(props) {
    super(props);
    const { selectedExercise, selectedSession } = this.props;
    this.state = {
      selectedExercise: null,
      selectorOpen: true,
      selectedType: selectedExercise ? selectedExercise.type : selectedSession.type,
      exerciseName: selectedExercise ? selectedExercise.name : selectedSession.name,
      newInstance: selectedExercise ? true : false
    }
    if(selectedSession && selectedSession.sets) {
      this.state.rows = selectedSession.sets;
    }
    else if(!selectedExercise || selectedExercise.sessions.length == 0) {
      this.state.rows = defaultValues;
    }
    else if(selectedExercise) {
      this.state.rows = selectedExercise.sessions[0].sets;
    }
  }

  onSessionEdit(sets) {
    const { dispatch, selectedSession } = this.props;
    let updatedSession = Object.assign({}, selectedSession);
    updatedSession.sets = sets;
    dispatch(editExerciseSession(updatedSession));
    this.props.navigator.push({addWorkout: 1});
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
          title={{ title: 'Add ' + this.state.exerciseName + ' exercise' }}/>

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
    workouts: state.workouts
  })
)(EditExerciseSession);