import NavigationBar from 'react-native-navbar';
import moment from 'moment';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput
} from 'react-native';


export default class WorkoutInformation extends Component {
    render() {
      const { workoutData } = this.props;
      console.log(workoutData);
      return (
        <View style={styles.container}>
          <NavigationBar
            title={{ title: 'Workout information' }}
            leftButton={{
              title: 'Back',
              handler: () => {this.props.navigator.push({workoutList: 1})}
            }}/>
          <Text>Workout detail</Text>
          <Text>{moment(workoutData.date).format('dddd, MMMM Do YYYY, h:mm:ss a')}</Text>
            {workoutData.exerciseUnits ? workoutData.exerciseUnits.map((unit, i) => {
              return (
                <View key={i}>
                  <Text>ExerciseID: {unit.exerciseId}</Text>
                  <Text>Data:{JSON.stringify(unit.sets)}</Text>
                </View>
              )
            }): null}
          </View>
        );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  suggestion: {
    color: 'gray',
    padding: 10
  },
  save: {
    marginTop: 30
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  rowItem: {
    flex: 1,
    paddingRight: 10
  },
  button: {
    padding: 15
  },
  removeRow: {
    alignItems: 'flex-end'
  }
});
