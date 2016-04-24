import { connect } from 'react-redux';
import WorkoutList from '../WorkoutList/WorkoutList';
import styles from './styles';
import NavigationBar from 'react-native-navbar';
import { removeExerciseSession, createNewWorkout, setWorkoutDate } from '../../reducers/workouts';
import Back from '../Back/Back';
import Icon from 'react-native-vector-icons/EvilIcons';
import G from '../../global';
import moment from 'moment';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  Picker,
  DatePickerIOS,
  AlertIOS,
  Animated,
  Dimensions
} from 'react-native';

class AddWorkout extends Component {
  constructor(props) {
    super(props);
    const deviceHeight = Dimensions.get('window').height;

    this.state = {
      deviceHeight: deviceHeight,
      offSet: new Animated.Value(deviceHeight),
      pickerOpen: false,
      date: new Date(this.props.workouts.currentDate),
      timeZoneOffsetInHours:  (-1) * (new Date()).getTimezoneOffset() / 60
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

  openPicker() {
    this.setState({pickerOpen: true});
    Animated.timing(this.state.offSet, {
      duration: 300,
      toValue: 100
    }).start()
  }

  closePicker() {
    Animated.timing(this.state.offSet, {
      duration: 300,
      toValue: this.state.deviceHeight
    }).start(() => {
      this.setState({pickerOpen: false})
    })
  }

  render() {
    const exitIcon = <Back onPress={() => this.props.navigator.push({})} />
    const { workouts } = this.props;

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
        <View style={styles.section}>
          <Text style={G.label}>{'Exercise log:'.toUpperCase()}</Text>
        </View>
        {workouts.currentSessions.map((session, i) => {
          return (
            <View key={i} style={styles.row}>
              <Text style={styles.rowText}key={i}>{session.name}</Text>
              <TouchableHighlight
                onPress={this.removeSession.bind(this, session)}>
                <Icon
                  style={styles.removeRow}
                  name="close"
                  size={20}
                  backgroundColor="#FFF"
                  color='#222222'
                ></Icon>
              </TouchableHighlight>
            </View>
          )})}
        <TouchableHighlight
          style={styles.row}
          underlayColor={G.primary}
          onPress={() => this.props.navigator.push({AddExerciseSession: 1})}>
          <View style={styles.addExercise}>
            <Icon
              name="plus"
              size={27}
              style={styles.addIcon}
              backgroundColor="#FFF"
              color={G.primary} />
            <Text>Add exercise</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.section}>
          <Text style={G.label}>{'Edit workout date:'.toUpperCase()}</Text>
        </View>

        <TouchableHighlight
          style={styles.row}
          underlayColor={G.primary}
          onPress={() => this.state.pickerOpen ? this.closePicker() : this.openPicker()}>
          <View style={styles.addExercise}>
            <Text>{moment(this.state.date).format('D MMM. YYYY, HH:mm').toLowerCase()}</Text>
          </View>
        </TouchableHighlight>

        {this.state.pickerOpen ?
          <Animated.View style={{ transform: [{translateY:this.state.offSet}] }}>
            <View style={styles.pickerTop}>
              <Text style={styles.pickerTopText} onPress={this.closePicker.bind(this)}>Done</Text>
            </View>
            <DatePickerIOS
            date={this.state.date}
            mode="datetime"
            maximumDate={new Date()}
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange.bind(this)} />
        </Animated.View>
        : null}
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