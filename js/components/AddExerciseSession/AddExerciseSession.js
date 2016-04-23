import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import Reps from '../Reps/Reps';
import { addExerciseSession } from '../../reducers/workouts';

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
  constructor() {
    super();
    this.state = {
      selectedExercise: null,
      selectorOpen: true,
      rows: null
    }
  }

  _updateBoiler() {
    this.setState({selectorOpen: false});
    const { exercises } = this.props;
    const exerciseId = this.state.selectedExercise.value;
    const selectedExercise = _.find(exercises.exercisesFromUser, {'_id': exerciseId});
    if(selectedExercise.sessions.length == 0) {
      this.setState({
        rows: defaultValues
      });
    }
    else {
      this.setState({
        rows: selectedExercise.sessions[0].sets
      })
    }
  }

  onSessionAdded(sets) {
    const { dispatch, user } = this.props;
    const exerciseId = this.state.selectedExercise.value;
    this.props.navigator.push({addWorkout: 1});
    dispatch(addExerciseSession(sets, exerciseId, user.data.userId, this.state.selectedExercise.name));

  }
  
  render() {
    const { exercises, workouts } = this.props;
    const exitIcon = <TouchableHighlight style={styles.closeButton} onPress={() => this.props.navigator.push({addWorkout: 1})}><Icon
      name="cross"
      size={30}
      backgroundColor="#FFF"
      color='#35BAF2'
    ></Icon></TouchableHighlight>;
    const trimmedExercises = exercises.exercisesFromUser.filter(ex => !_.find(workouts.currentSessions, {'exerciseId': ex._id}));
    const exerciseOptions = trimmedExercises.map((ex, key) => {
      return <Picker.Item key={key} label={ex.name} value={ex._id} />;
    });
    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={exitIcon}
          title={{ title: 'Add new exercise' }}/>
        <TouchableHighlight style={styles.row} onPress={() => this.setState({selectorOpen: !this.state.selectorOpen }) }>
          <Text>{this.state.selectedExercise ? this.state.selectedExercise.name : 'Select exercise'}</Text>
        </TouchableHighlight>

        {this.state.selectorOpen ? <View>
          <Picker
            selectedValue={this.state.selectedExercise ? this.state.selectedExercise.value : null}
            onValueChange={(exercise, index) => this.setState({
              selectedExercise: {
                name: exercises.exercisesFromUser[index].name,
                value: exercise
              }
            })}>
            {exerciseOptions}
          </Picker>
          {this.state.selectedExercise ? <TouchableHighlight onPress={this._updateBoiler.bind(this)}>
            <Text>Choose</Text>
          </TouchableHighlight>: null}
        </View>: null}

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