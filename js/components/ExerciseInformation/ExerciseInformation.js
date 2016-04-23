import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import { loadDetailExercise } from '../../reducers/exercises';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class ExerciseInformation extends Component {
  componentWillMount() {
    const { dispatch, data } = this.props;
    dispatch(loadDetailExercise(data));
  }

  leftButtonConfig() {
    return {
      title: 'Back',
      handler: () => this.props.navigator.push({exerciseList: 1})
    };
  }

  render() {
    const { data, exercises } = this.props;
    const sessions = exercises.detailedExercise ? exercises.detailedExercise.sessions.map((sess) => {
      return <Text>{sess}</Text>
    }) : null;

    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: data.name }}
          leftButton={this.leftButtonConfig()} />
        {exercises.isLoading ? <Text>Is loading</Text>: null}
        {sessions}
      </View>
    );
  }
}

export default connect(
  (state) => ({
    exercises: state.exercises
  })
)(ExerciseInformation);