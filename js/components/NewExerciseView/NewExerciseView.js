import { connect } from 'react-redux';

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
    const suggestions = this.state.suggestions.map((s, i) => {
      return <TouchableHighlight
        key={i}
        onPress={() => this.onChange(s)}>
        <Text style={styles.suggestion}>{s}</Text>
      </TouchableHighlight>
    });
    return (
      <View style={styles.container}>
        <Text>NewExerciseView</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.onChange.bind(this)}
          value={this.state.name}
        />
        {suggestions}
        <TouchableHighlight style={styles.save} onPress={this.onPress} underlayColor='#99d9f4'>
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
