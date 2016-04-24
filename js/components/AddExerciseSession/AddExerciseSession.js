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
      const newSort = _.sortBy(selectedExercise.sessions, (value) => new Date(value.date));

      let found = false;
      for(var i = newSort.length -1; i !== 0; i--) {
        if(typeof newSort[i][0] == 'object') {
          this.state.rows = newSort[i][0].reps;
          found = true;
        }
      }
      if(!found) {
        this.state.rows = defaultValues;
      }
    }
  }

  onSessionAdded(sets) {
    const { dispatch, user, selectedExercise } = this.props;
    const exerciseId = selectedExercise._id;
    this.props.navigator.push({addWorkout: 1});
    dispatch(addExerciseSession(sets, exerciseId, user.data.userId, selectedExercise.name));
  }
  
  render() {
    const exitIcon = <TouchableHighlight style={styles.closeButton} onPress={() => this.props.navigator.push({addWorkout: 1})}><Icon
      name="cross"
      size={30}
      backgroundColor="#FFF"
      color='#35BAF2'
    ></Icon></TouchableHighlight>;
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