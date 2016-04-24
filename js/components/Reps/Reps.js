import Icon from 'react-native-vector-icons/EvilIcons';
import G from '../../global';
import Button from '../Button/Button';
import FloatLabelTextInput from 'react-native-floating-label-text-input';

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
    console.log(this.props.intialRows);
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
              <Text style={styles.rowCount}>{(index + 1) + '.'}</Text>
              <View style={styles.rowItem}>
                <FloatLabelTextInput
                  placeHolder={'Reps'}
                  noBorder={true}
                  value={this.state.rows[index] ? this.state.rows[index].reps.toString() : null}
                  onChangeTextValue={this.changeText.bind(this, index, 'reps')}
                />
              </View>
              <Text>x</Text>
              <View style={styles.rowItem}>
                <FloatLabelTextInput
                  placeHolder={'Value'}
                  noBorder={true}
                  value={this.state.rows[index] ? this.state.rows[index].value.toString() : null}
                  onChangeTextValue={this.changeText.bind(this, index, 'value')}
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowItem: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'center'
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
  }
});
