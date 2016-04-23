import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  Picker
} from 'react-native';

class AddWorkout extends Component {
  constructor() {
    super();
    this.state = {
      selectedExercise: null,
      selectorOpen: false
    }
  }
  render() {
    const { exercises } = this.props;
    const exitIcon = <TouchableHighlight style={styles.closeButton} onPress={() => this.props.navigator.push({addWorkout: 1})}><Icon
      name="cross"
      size={30}
      backgroundColor="#FFF"
      color='#35BAF2'
    ></Icon></TouchableHighlight>;
    const exerciseOptions = exercises.exercisesFromUser.map((ex, key) => {
      return <Picker.Item key={key} label={ex.name} value={ex._id} />
    });
    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={exitIcon}
          title={{ title: 'Add new exercise' }}/>
        <TouchableHighlight style={styles.row} onPress={() => this.setState({selectorOpen: !this.state.selectorOpen }) }>
          <Text>{this.state.selectedExercise ? this.state.selectedExercise.name : 'Select exercise'}</Text>
        </TouchableHighlight>

        {this.state.selectorOpen ? <View>
          <Picker
            selectedValue={this.state.selectedExercise ? this.state.selectedExercise.value : null}
            onValueChange={(exercise, index) => this.setState({
              selectedExercise: {
                name: exercises.exercisesFromUser[index].name,
                value: exercise
              }
            })}>
            {exerciseOptions}
          </Picker>
          {this.state.selectedExercise ? <TouchableHighlight onPress={() => this.setState({selectorOpen: false})}>
            <Text>Choose</Text>
          </TouchableHighlight>: null}
        </View>: null}

      </View>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    exercises: state.exercises
  })
)(AddWorkout);