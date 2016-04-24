import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import { loadDetailExercise } from '../../reducers/exercises';
import G from '../../global';
import moment from 'moment';
import Button from '../Button/Button';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: G.grey,
  },
  name: {
    backgroundColor: G.grey,
    padding:10,
  },
  row: {
    flexDirection: 'row'
  },
  count: {
    color: '#808080',
    width: 35,
  }
});

class ExerciseInformation extends Component {
  leftButtonConfig() {
    return {
      title: 'Back',
      handler: () => this.props.navigator.push({exerciseList: 1})
    };
  }

  render() {
    let _scrollView;
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: data.name }}
          leftButton={this.leftButtonConfig()} />
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          scrollEventThrottle={200}
          showsVerticalScrollIndicator={true}>
            {data.sessions.map((unit, key) => {
              return (
                <View key={key}>
                  <Text style={styles.name}>{moment(unit.date).format('D MMMM - YYYY')}</Text>
                  {unit.sets.map((set, i) => {
                    return (
                      <View key={i} style={[G.basicRow, styles.row]}>
                        <Text style={[styles.rowItem, styles.count]}>{i}.</Text>
                        <Text>{set.reps}</Text>
                        <Text>{set.value ? ' x ' + set.value : ''}</Text>
                      </View>
                    )
                  })}
                </View>
              )
            })}
        </ScrollView>
        {data.sessions.length == 0 ?
          <Button onPress={() => {this.props.navigator.push({addWorkout: 1})}}>
            You dont have any workouts for this exercise, create one?</Button>: null}
      </View>
    );
  }
}

export default connect(
  (state) => ({
    exercises: state.exercises
  })
)(ExerciseInformation);