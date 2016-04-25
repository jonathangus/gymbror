import Icon from 'react-native-vector-icons/EvilIcons';
import G from '../../global';
import Button from '../Button/Button';

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
    const newRow = Object.assign({}, rows[rows.length - 1]);

    this.setState({
      rows: [...rows, newRow]
    }, () => {
      this.refs['reps-' + (this.state.rows.length - 1)].focus();
    });
  }

  removeRow(index) {
    const { rows } = this.state;
    const uno = Object.assign([], rows);
    const newRows = Object.assign([], uno.filter((_, i) => i !== index));
    if(newRows.length > 0) {
      this.setState({
        rows: newRows
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

  tabNext(index, target) {
    const { rows } = this.state;
    if(rows[index]) {
      this.refs[target + '-' + index].focus();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.rows.map((r, index) => {
          return (
          <View key={index} style={styles.row}>
              <Text style={styles.rowCount}>{(index + 1) + '.'}</Text>
              <View style={styles.rowItem}>
                <TextInput
                  ref={'reps-' + index}
                  style={[styles.inputStyle, styles.firstInput]}
                  onChangeText={this.changeText.bind(this, index, 'reps')}
                  value={this.state.rows[index] ? this.state.rows[index].reps.toString() : null}
                  onSubmitEditing={() => this.tabNext(index, 'value')}
                />
              </View>
              <Text style={styles.times}>x</Text>
              <View style={styles.rowItem}>
                <TextInput
                  ref={'value-' + index}
                  style={styles.inputStyle}
                  onChangeText={this.changeText.bind(this, index, 'value')}
                  value={this.state.rows[index] ? this.state.rows[index].value.toString() : null}
                  onSubmitEditing={() => this.tabNext(index + 1, 'reps')}
                />
            </View>

              <Icon
                onPress={this.removeRow.bind(this, index)}
                style={styles.removeRow}
                name="close"
                size={20}
                backgroundColor="#FFF"
                color='#222222'
              />
            </View>
          )
        })}

        <View style={G.section}>
          <Button onPress={this.addRow.bind(this)}>
            Add row
          </Button>
        </View>

        <View style={G.section}>
          <Button onPress={this.complete.bind(this)}>
            Complete
          </Button>
        </View>
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
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth:1,
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  rowItem: {
    flex: 1,
    //paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 15
  },
  rowCount: {
    flex: 0,
    color: '#808080',
    width: 15,
  },
  removeRow: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  inputStyle: {
    height: 35,
  },
  firstInput: {
    textAlign: 'right'
  },
  times: {
    padding: 10,
  }
});
