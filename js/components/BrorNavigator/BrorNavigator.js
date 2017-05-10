import Landing from '../Landing/Landing';
import { connect } from 'react-redux';
import Auth from '../Auth/Auth';
import NewExerciseView from '../NewExerciseView/NewExerciseView';
import ExerciseList from '../ExerciseList/ExerciseList';
import ExerciseInformation from '../ExerciseInformation/ExerciseInformation';
import AddWorkout from '../AddWorkout/AddWorkout';
import EditExerciseSession from '../EditExerciseSession/EditExerciseSession';
import WorkoutInformation from '../WorkoutInformation/WorkoutInformation';
import WorkoutList from '../WorkoutList/WorkoutList';
import React, { Component } from 'react';

import {
  Navigator
} from 'react-native-deprecated-custom-components';


import {
  StyleSheet
} from 'react-native';

class BrorNavigator extends Component {
  
  renderScene(route, navigator) {
    if(route.exerciseList) {
      return <ExerciseList navigator={navigator} />
    }
    else if(route.newExercise) {
      return <NewExerciseView navigator={navigator} />
    }
    else if(route.workoutList) {
      return <WorkoutList navigator={navigator} />
    }
    else if(route.workoutInformation) {
      return <WorkoutInformation navigator={navigator} workoutData={route.workoutData} />
    }
    else if(route.addWorkout) {
      return <AddWorkout navigator={navigator} />
    }
    else if(route.ExerciseInformation) {
      return <ExerciseInformation exerciseData={route.exercise} navigator={navigator} />
    }
    else if(route.EditExerciseSession) {
      return <EditExerciseSession navigator={navigator} selectedExercise={route.selectedExercise} selectedSession={route.selectedSession} />
    }

    const { user } = this.props
    return user.isLoggedIn ? <Landing navigator={navigator} /> : <Auth />;
  }
  
  render() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromRight;
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
        initialRoute={{}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
  (state) => ({
    user: state.user
  })
)(BrorNavigator);