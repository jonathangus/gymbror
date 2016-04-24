import { connect } from 'react-redux';
import { createExercise } from '../../reducers/exercises';
import { MessageBarManager } from 'react-native-message-bar';
import NavigationBar from 'react-native-navbar';
import Back from '../Back/Back';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput
} from 'react-native';


class NewExerciseView extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      suggestions: []
    }
  }

  _saveExercise() {
    if(this.state.name.length > 0) {
      const { dispatch } = this.props;
      dispatch(createExercise(this.state.name));
      this.props.navigator.push({exerciseList: 1});
    }
  }

  onChange(name) {
    const { exercises } = this.props;
    const suggestions = exercises.suggestedExercises.filter((exer) => {
      return exer.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });
    this.setState({
      name: name,
      suggestions: suggestions
    });
  }

  render() {
    const leftButton = <Back onPress={this.props.navigator.push({exerciseList: 1})} />;
    const suggestions = this.state.suggestions.map((s, i) => {
      return <TouchableHighlight
        key={i}
        onPress={() => this.onChange(s)}>
        <Text style={styles.suggestion}>{s}</Text>
      </TouchableHighlight>
    });
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'Add new exercise' }}
          leftButton={leftButton}/>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.onChange.bind(this)}
          value={this.state.name}
        />
        {suggestions}
        <TouchableHighlight style={styles.save} onPress={this._saveExercise.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
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
  },
  suggestion: {
    color: 'gray',
    padding: 10
  },
  save: {
    marginTop: 30
  }
});
