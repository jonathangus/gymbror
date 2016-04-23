import Icon from 'react-native-vector-icons/Entypo';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput
} from 'react-native';


export default class Reps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.intialRows
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rows: nextProps.intialRows
    })
  }

  addRow() {
    let { rows } = this.state;
    this.setState({
      rows: [...rows, rows[rows.length - 1]]
    });
  }

  removeRow(index) {
    const { rows } = this.state;
    if(rows.length > 1) {
      this.setState({
        rows: [
          ...rows.slice(0, index),
          ...rows.slice(index + 1)
        ]
      });
    }
  }
  
  changeText(index, target, text) {
    const { rows } = this.state;
    rows[index][target] = text;
    this.setState({
      rows: rows
    });
  }

  complete() {
    const { rows } = this.state;
    this.props.onComplete(rows);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.rows.map((r, index) => {
          return (
            <View key={index} style={styles.row}>
              <View style={styles.rowItem}>
                <Text>Reps:</Text><TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={this.changeText.bind(this, index, 'reps')}
                  value={this.state.rows[index].reps.toString()}
                />
              </View>
              <View style={styles.rowItem}>
                <Text>Värde:</Text><TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={this.changeText.bind(this, index, 'value')}
                  value={this.state.rows[index].value.toString()}
                />
            </View>

              <TouchableHighlight style={styles.closeButton} onPress={this.removeRow.bind(this, index)}><Icon
                name="cross"
                size={30}
                backgroundColor="#FFF"
                color='#222222'
              ></Icon></TouchableHighlight>
            </View>
          )
        })}
        <TouchableHighlight style={styles.button} onPress={this.addRow.bind(this)}>
          <Text>Add row</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button} onPress={this.complete.bind(this)}>
          <Text>Complete</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

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
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  rowItem: {
    flex: 1,
    paddingRight: 10
  },
  button: {
    padding: 15
  },
  removeRow: {
    alignItems: 'flex-end'
  }
});
