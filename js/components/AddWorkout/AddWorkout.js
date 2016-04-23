import { connect } from 'react-redux';
import WorkoutList from '../WorkoutList/WorkoutList';
import styles from './styles';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Entypo';
import { removeExerciseSession, createNewWorkout } from '../../reducers/workouts';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  Picker,
  DatePickerIOS
} from 'react-native';

class AddWorkout extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      timeZoneOffsetInHours:  (-1) * (new Date()).getTimezoneOffset() / 60
    }
  }
  removeSession(session) {
    const { dispatch } = this.props;
    dispatch(removeExerciseSession(session));
  }

  submitWorkout() {
    const { workouts, user, dispatch, navigator } = this.props;
    const workoutData = {
      sessions: workouts.currentSessions,
      userId: user.data.userId,
      date: this.state.date
    };

    dispatch(createNewWorkout(workoutData));
    navigator.push({});
  }

  onDateChange(date) {
    this.setState({date: date});
  }

  render() {
    const exitIcon = <TouchableHighlight style={styles.closeButton} onPress={() => this.props.navigator.push({})}><Icon
      name="cross"
      size={30}
      backgroundColor="#FFF"
      color='#35BAF2'
    ></Icon></TouchableHighlight>;
    const { workouts } = this.props;

    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'Add new workout' }}
          leftButton={exitIcon}/>
        {workouts.currentSessions.map((session, i) => {
          return (
            <View key={i} style={styles.row}>
              <Text style={styles.rowText}key={i}>{session.name || session.exerciseId}</Text>
              <TouchableHighlight
                onPress={this.removeSession.bind(this, session)}>
                <Icon
                  style={styles.removeRow}
                  name="cross"
                  size={30}
                  backgroundColor="#FFF"
                  color='#222222'
                ></Icon>
              </TouchableHighlight>
            </View>
          )})}
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigator.push({AddExerciseSession: 1})}>
          <Text>Add exercise</Text>
        </TouchableHighlight>

        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange.bind(this)} />

        {workouts.currentSessions.length > 0 ? <TouchableHighlight
          style={styles.button}
          onPress={this.submitWorkout.bind(this)}>
          <Text>Submit workout</Text>
        </TouchableHighlight>: null }
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