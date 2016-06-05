import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import { loadDetailExercise } from '../../reducers/exercises';
import G from '../../global';
import moment from 'moment';
import Button from '../Button/Button';
import { VictoryArea } from 'victory';

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
  constructor(props) {
    super(props);
    
    
    this.state = {
      graphData: this.getGraphData()
    }
  }

  getGraphData() {
    const { data } = this.props;

    let graphData = [];
    data.sessions.forEach((sess) => {
      let graphItem = {};
      graphItem.date = sess.date;

      let sessionValue = 0;

      sess.sets.forEach((set) => {
        if(data.type == 'weight') {
          const epleyFormula = (weight, reps) => weight * (1 + reps / 30);
          sessionValue = sessionValue + epleyFormula(parseInt(set.reps),parseFloat(set.value));
        }
        else {
          sessionValue += parseInt(set.reps);
        }
      });

      graphItem.medianValue = sessionValue / sess.sets.length;
      graphData.push(graphItem);
    });
    
    return graphData;
  }

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

        {this.state.graphData.map((g) => { return(
          <View>
            <Text>{g.date}</Text>
            <Text>Median: {g.medianValue}</Text>
          </View>
        )})}

        <VictoryArea
          data={[
    {x: 1, y: 1},
    {x: 2, y: 2},
    {x: 3, y: 3},
    {x: 4, y: 1},
    {x: 5, y: 3},
    {x: 6, y: 4},
    {x: 7, y: 2}
  ]}
        />


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