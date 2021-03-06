import { connect } from 'react-redux';
import { createExercise } from '../../actions/exerciseActions';
import { MessageBarManager } from 'react-native-message-bar';
import NavigationBar from 'react-native-navbar';
import Back from '../Back/Back';
import Button from '../Button/Button';
import G from '../../global';
import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  AlertIOS,
  TextInput,
  SegmentedControlIOS
} from 'react-native';


class NewExerciseView extends Component {
  constructor(props) {
    super(props);

    const suggestions = this.props.exercises.suggestedExercises;

    this.state = {
      exerciseName: '',
      suggestions: suggestions,
      types: ['Weight', 'Reps', 'Time'],
      selectedIndex: 0
    }
  }

  _saveExercise() {
    const { exerciseName, types, selectedIndex } = this.state;
    const { exercises } = this.props;
    const match = exercises.exercisesFromUser.filter((exer) => exerciseName.toLowerCase() == exer.exerciseName.toLowerCase());
    if(match.length > 0) {
      AlertIOS.alert(
        'Hey!',
        'You have already added a exercise with this exerciseName',
        [{
          text: 'Okidoki'
        }]
      );

      return;
    }
    if(exerciseName.length > 0) {
      const { dispatch } = this.props;
      dispatch(createExercise(exerciseName, types[selectedIndex].toLowerCase()));
      this.props.navigator.push({exerciseList: 1});
    }
  }

  onChange(exerciseName) {
    const { exercises } = this.props;
    const suggestions = exercises.suggestedExercises.filter((exer) => {
      return exer.toLowerCase().indexOf(exerciseName.toLowerCase()) > -1 && exer.toLowerCase() !== exerciseName.toLowerCase();
    });
    this.setState({
      exerciseName: exerciseName,
      suggestions: suggestions
    });
  }

  render() {
    const leftButton = <Back onPress={() => this.props.navigator.push({exerciseList: 1})} />;
    const suggestions = this.state.suggestions.map((s, i) => {
      return <TouchableHighlight
        style={styles.suggestionItem}
        key={i}
        onPress={this.onChange.bind(this, s)}>
        <Text style={styles.suggestion}>{s}</Text>
      </TouchableHighlight>
    });
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'Add new exercise' }}
          leftButton={leftButton}/>
        <View>

          <View style={G.section}>
            <Text style={G.label}>{'Name'}</Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            value={this.state.exerciseName}
            onChangeText={(text) => this.onChange(text)}
           />
        </View>
        {suggestions}

        <View style={G.section}>
          <Text style={G.label}>{'Type'}</Text>
        </View>

        <SegmentedControlIOS
          style={styles.types}
          tintColor={G.primary}
          values={this.state.types}
                selectedIndex={this.state.selectedIndex}
                onChange={(event) => {
          this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
        }}
        />

        <View style={[G.section, styles.save]}>
          {this.state.exerciseName.length > 0 ? <Button onPress={this._saveExercise.bind(this)}>Save</Button> : null}
        </View>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    exercises: state.exercises
  })
)(NewExerciseView);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: G.grey
  },
  suggestionItem: {
    borderBottomWidth:1,
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  suggestion: {
    color: 'gray',
    padding: 10
  },
  types: {
    marginLeft: 10,
    marginRight: 10,
  },
  save: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40
  },
  textInput: {
    height: 60
  },
  inputStyle: {
    height: 35,
    borderColor: '#808080',
    paddingLeft: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
  }
});
