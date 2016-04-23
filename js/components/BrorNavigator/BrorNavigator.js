import Landing from '../Landing/Landing';
import { connect } from 'react-redux';
import Auth from '../Auth/Auth';
import NewExerciseView from '../NewExerciseView/NewExerciseView';
import ExerciseList from '../ExerciseList/ExerciseList';
import ExerciseInformation from '../ExerciseInformation/ExerciseInformation';
import AddWorkout from '../AddWorkout/AddWorkout';
import AddExerciseSession from '../AddExerciseSession/AddExerciseSession';
import WorkoutInformation from '../WorkoutInformation/WorkoutInformation';

import React, {
  Navigator,
  Component,
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
    else if(route.workoutInformation) {
      return <WorkoutInformation navigator={navigator} workoutData={route.workoutData} />
    }
    else if(route.addWorkout) {
      return <AddWorkout navigator={navigator} />
    }
    else if(route.ExerciseInformation) {
      return <ExerciseInformation data={route.exercise} navigator={navigator} />
    }
    else if(route.AddExerciseSession) {
      return <AddExerciseSession navigator={navigator} />
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