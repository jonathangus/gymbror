import { connect } from 'react-redux';
import WorkoutList from '../WorkoutList/WorkoutList';
import styles from './styles';
import NavigationBar from 'react-native-navbar';
import { removeExerciseSession, createNewWorkout, setWorkoutDate } from '../../reducers/workouts';
import Back from '../Back/Back';
import Icon from 'react-native-vector-icons/EvilIcons';
import G from '../../global';
import moment from 'moment';
import ExerciseSelect from '../ExerciseSelect/ExerciseSelect';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  Picker,
  DatePickerIOS,
  AlertIOS,
  Animated,
  ScrollView,
  Dimensions
} from 'react-native';

class AddWorkout extends Component {
  constructor(props) {
    super(props);
    const deviceHeight = Dimensions.get('window').height;
    this.state = {
      deviceHeight: deviceHeight,
      offSet: new Animated.Value(deviceHeight),
      date: new Date(this.props.workouts.currentDate),
      timeZoneOffsetInHours:  (-1) * (new Date()).getTimezoneOffset() / 60,
      selectedChooseType: null,
      selectedExercise: null
    }
  }
  removeSession(session) {
    const { dispatch } = this.props;
    dispatch(removeExerciseSession(session));
  }

  submitWorkout() {
    const { workouts, user, dispatch, navigator } = this.props;
    if(workouts.currentSessions.length == 0) {
      AlertIOS.alert(
        'Hey!',
        'You have not added any exercises',
        [{
          text: 'Okidoki'
        }]
      );
    }
    else {
      const workoutData = {
        sessions: workouts.currentSessions,
        userId: user.data.userId,
        date: this.state.date
      };
      dispatch(createNewWorkout(workoutData));
      navigator.push({});
    }
  }

  onDateChange(date) {
    this.props.dispatch(setWorkoutDate(date));
    this.setState({date: date});
  }

  toggleChooser(type) {
      if(!type || this.state.selectedChooseType == type) {
        Animated.timing(this.state.offSet, {
          duration: 300,
          toValue: this.state.deviceHeight
        }).start(() => {
          this.setState({selectedChooseType: null})
        })
      }
      else if(this.state.selectedChooseType) {
        Animated.timing(this.state.offSet, {
          duration: 300,
          toValue: this.state.deviceHeight
        }).start(() => {
          this.setState({
            selectedChooseType: type
          });
          Animated.timing(this.state.offSet, {
            duration: 300,
            toValue: 100
          }).start()
        })
      }
      else {
        this.setState({
          selectedChooseType: type
        });
        Animated.timing(this.state.offSet, {
          duration: 300,
          toValue: 100
        }).start()
      }
  }

  _newExercise(exercise) {
    const { navigator } = this.props;
    navigator.push({EditExerciseSession: 1, selectedExercise: exercise});
  }

  goToExerciseSession(session) {
    this.props.navigator.push({EditExerciseSession: 1, selectedSession: session});
  }

  render() {
    const exitIcon = <Back onPress={() => this.props.navigator.push({})} />
    const { workouts, exercises } = this.props;
    const trimmedExercises = exercises.exercisesFromUser.filter(ex => !_.find(workouts.currentSessions, {'exerciseId': ex._id}));

    const datepicker = <View style={styles.picker}>
      <View style={styles.pickerTop}>
        <Text style={styles.pickerTopText} onPress={() => this.toggleChooser()}>
          Done
        </Text>
      </View>
      <DatePickerIOS
        date={this.state.date}
        mode="datetime"
        maximumDate={new Date()}
        timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
        onDateChange={this.onDateChange.bind(this)} />
    </View>;

    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'Add new workout' }}
          leftButton={exitIcon}
          rightButton={{
            title: 'Finish',
            handler: this.submitWorkout.bind(this)
          }}
        />
        <ScrollView>
          <View style={styles.section}>
            <Text style={G.label}>{'Exercise log:'.toUpperCase()}</Text>
          </View>

          {workouts.currentSessions.map((session, i) => {
            return (
              <TouchableHighlight
                underlayColor={G.grey}
                key={i}
                style={[styles.row, styles.itemRow]}
                onPress={this.goToExerciseSession.bind(this, session)}>
                <View style={styles.innerRow}>
                  <Text style={styles.rowText}key={i}>{session.name}</Text>
                  <Icon.Button
                    name="minus"
                    size={27}
                    onPress={this.removeSession.bind(this, session)}
                    style={styles.removeIcon}
                    backgroundColor="#FFF"
                    color={G.primary} />
                </View>

              </TouchableHighlight>
            )})}

          <View style={styles.section}>
            <Text style={G.label}>{'Select exercise:'.toUpperCase()}</Text>
          </View>

          <ExerciseSelect
            onSelect={this._newExercise.bind(this)}
            exercises={trimmedExercises} />

            <View style={styles.section}>
              <Text style={G.label}>{'Create new exercise:'.toUpperCase()}</Text>
            </View>

          <TouchableHighlight
            style={styles.row}
            underlayColor={G.primary}
            onPress={() => this.props.navigator.push({newExercise: 1})}>
            <View style={styles.addExercise}>
              <Icon
                name="plus"
                size={27}
                style={styles.addIcon}
                backgroundColor="#FFF"
                color={G.primary} />
              <Text>Create new exercise</Text>
            </View>
          </TouchableHighlight>


          <View style={styles.section}>
            <Text style={G.label}>{'Edit workout date:'.toUpperCase()}</Text>
          </View>

          <TouchableHighlight
            style={styles.row}
            underlayColor={G.primary}
            onPress={() => this.toggleChooser('datePicker')}>
            <View style={styles.addExercise}>
              <Text>{moment(this.state.date).format('D MMM. YYYY, HH:mm').toLowerCase()}</Text>
            </View>
          </TouchableHighlight>

          {this.state.selectedChooseType ?
            <Animated.View style={[styles.chooseWrap, { transform: [{translateY:this.state.offSet}] }]}>
              {datepicker}
            </Animated.View>
          : null}
        </ScrollView>
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
