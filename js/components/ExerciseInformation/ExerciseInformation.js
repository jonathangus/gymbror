import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import G from '../../global';
import moment from 'moment';
import Button from '../Button/Button';
import { mapSessions } from '../../util';
//import RNChart from 'react-native-chart';
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

var styles = StyleSheet.create({
  chart: {
    flex: 1,
    marginTop:30,
    marginBottom:30,
    height: 250,
    marginLeft: 10,
    marginRight: 5
  },
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
  static propTypes = {
    exerciseData: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      graphData: this.getGraphData(),
      sessions: this.getSessions()
    }
  }

  getSessions() {
    const { sessions, exerciseData: { _brorId } } = this.props;
    return mapSessions(sessions, '_exerciseId', _brorId);
  }

  getGraphData() {
    const { exerciseData } = this.props;

    let graphData = [];
    exerciseData.sessions.forEach((sess) => {
      let graphItem = {};
      graphItem.date = sess.date;

      let sessionValue = 0;
      let maxValue = 0;
      sess.sets.forEach((set) => {
        if(exerciseData.type == 'weight') {
          const epleyFormula = (weight, reps) => weight * (1 + reps / 30);
          const oneRM = epleyFormula(parseInt(set.reps),parseFloat(set.value));
          sessionValue = sessionValue + oneRM;
          maxValue = maxValue < oneRM ? oneRM : maxValue;
        }
        else {
          sessionValue += parseInt(set.reps);
          maxValue = maxValue < set.reps ? set.reps : maxValue;
        }
      });

      graphItem.medianValue = sessionValue / sess.sets.length;
      graphItem.maxValue = maxValue;
      graphData.push(graphItem);
    });

    return graphData;
  }

  generateGraph() {
    const { graphData } = this.state;

    return {
      labels: graphData.map(g => moment(g.date).format('DD/MM')).reverse(),
      data: [{
        name: 'LineChart',
        color: 'gray',
        highlightColor: 'orange',
        showDataPoint: true,
        data: graphData.map(g => g.medianValue).reverse(),
      }]
    }
  }

  leftButtonConfig() {
    return {
      title: 'Back',
      handler: () => this.props.navigator.push({exerciseList: 1})
    };
  }

  render() {
    const graph = this.generateGraph();
    const { exerciseData: { exerciseName } } = this.props;
    const { sessions } = this.state;
    //<RNChart style={styles.chart}
    //         chartData={graph.exerciseData}
    //         verticalGridStep={5}
    //         xLabels={graph.labels} />
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: exerciseName }}
          leftButton={this.leftButtonConfig()} />

        <ScrollView
          scrollEventThrottle={200}
          showsVerticalScrollIndicator={true}>

            {sessions.map((unit, key) => {
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
        {sessions.length == 0 ?
          <Button onPress={() => {this.props.navigator.push({addWorkout: 1})}}>
            You dont have any workouts for this exercise, create one?</Button>: null}
      </View>
    );
  }
}

export default connect(
  (state) => ({
    exercises: state.exercises,
    sessions: state.sessions
  })
)(ExerciseInformation);
