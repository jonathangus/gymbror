import Icon from 'react-native-vector-icons/EvilIcons';
import G from '../../global';
import Button from '../Button/Button';
import IconEntypo from 'react-native-vector-icons/Entypo';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  DeviceEventEmitter,
  Animated
} from 'react-native';


export default class Reps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.props.intialRows,
      keyboardOpen: false,
      keyboardOffset: new Animated.Value(0),
      selectedInput: null
    }

    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  keyboardWillShow(e) {
    Animated.spring(this.state.keyboardOffset, {
      toValue: e.endCoordinates.height,
      friction: 6
    }).start();
    this.setState({
      keyboardOpen: true
    });
  }

  keyboardWillHide() {
    this.setState({
      keyboardOpen: false
    });
    Animated.spring(this.state.keyboardOffset, {
      toValue: 0,
      friction: 6
    }).start();
  }

  componentWillUnmount() {
    //DeviceEventEmitter.removeListener('keyboardWillShow');
    //DeviceEventEmitter.removeListener('keyboardWillHide');
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
    if(isNaN(text)) return;

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

  changeInputValue(dir) {
    const { rows, selectedInput } = this.state;
    const ammount = selectedInput.type == 'value' ? 2.5 : 1;
    const val = dir == 'up' ? ammount : -ammount;
    const newVal = parseFloat(rows[selectedInput.index][selectedInput.type]) + val;
    if(newVal < 0) return;

    rows[selectedInput.index][selectedInput.type] = newVal;
    this.setState({
      rows: rows
    });
  }

  _setSelectedInput(index, type) {
    let newRows = Object.assign([], this.state.rows);
    newRows.forEach((row) => {
      if(row.value == '') {
        row.value = 0;
      }
      if(row.reps == '') {
        row.reps = 0;
      }
    });

    this.setState({
      selectedInput: {
        node: this.refs[type + '-' + index],
        index: index,
        type: type
      },
      rows: newRows
    });
  }

  _getSingleInputs(index) {
    return (
      <View style={styles.full}>
        <TextInput
          ref={'reps-' + index}
          style={[styles.inputStyle, styles.firstInput, styles.single]}
          onChangeText={this.changeText.bind(this, index, 'reps')}
          value={this.state.rows[index] ? this.state.rows[index].reps.toString() : null}
          onFocus={this._setSelectedInput.bind(this, index, 'reps')}
          keyboardType={'numeric'}
        />
      </View>
    )
  }

  _getMultipleInputs(index) {
    return (
      <View style={styles.full}>
        <TextInput
          ref={'reps-' + index}
          style={[styles.inputStyle, styles.firstInput]}
          onChangeText={this.changeText.bind(this, index, 'reps')}
          value={this.state.rows[index] ? this.state.rows[index].reps.toString() : null}
          keyboardType={'numeric'}
          onFocus={this._setSelectedInput.bind(this, index, 'reps')}
        />

        <Text style={styles.times}>x</Text>
        <TextInput
          ref={'value-' + index}
          style={styles.inputStyle}
          onChangeText={this.changeText.bind(this, index, 'value')}
          value={this.state.rows[index] ? this.state.rows[index].value.toString() : null}
          keyboardType={'numeric'}
          onFocus={this._setSelectedInput.bind(this, index, 'value')}
        />
      </View>
    )
  }

  keyBoardPager(dir) {
    const { rows, selectedInput } = this.state;
    let index = selectedInput.index;

    if(dir == 'next' && (selectedInput.type == 'value' || this.props.type !== 'weight')) {
      index = index + 1;
    }
    else if(dir == 'back' && selectedInput.type == 'reps') {
      index = index - 1;
    }

    const target = this.props.type !== 'weight' ? 'reps'
      : (selectedInput.type == 'value' ? 'reps' : 'value');

    if(rows[index]) {
      this.refs[target + '-' + index].focus();
    }
  }

  render() {
    return (
      <Animated.View style={[styles.container, {marginBottom: this.state.keyboardOffset}]}>

        <View style={styles.labelsWrap}>
          <Text style={styles.label}>Reps</Text>
          {this.props.type == 'weight' ?
            <Text style={[styles.label, styles.weightLabel]}>Weight</Text>
          : null}
        </View>

        {this.state.rows.map((r, index) => {
          return (
          <View key={index} style={styles.row}>
              <Text style={styles.rowCount}>{(index + 1) + '.'}</Text>
              {this.props.type == 'weight' ? this._getMultipleInputs(index) : this._getSingleInputs(index)}

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

        <View style={styles.actions}>
          <IconEntypo.Button
            style={[styles.actionButton, styles.addRowButton]}
            onPress={this.addRow.bind(this)}
            name='plus'
            backgroundColor={'#A6A8AC'}>
            <Text style={styles.actionText}>Add row</Text>
          </IconEntypo.Button>

          <IconEntypo.Button
            style={styles.actionButton}
            onPress={this.complete.bind(this)}
            name='check'
            backgroundColor={G.primary}>
            <Text style={styles.actionText}>Complete</Text>
          </IconEntypo.Button>
        </View>

        {this.state.keyboardOpen ? <View style={styles.valueNav}>
          <IconEntypo.Button
            style={styles.keyboardButton}
            name='controller-fast-backward'
            backgroundColor={G.primary}
            onPress={this.keyBoardPager.bind(this, 'back')}/>

         <IconEntypo.Button
           style={styles.keyboardButton}
           onPress={this.changeInputValue.bind(this, 'down')}
           name='circle-with-minus'
           backgroundColor={G.primary} />

         <IconEntypo.Button
           style={styles.keyboardButton}
           onPress={this.changeInputValue.bind(this, 'up')}
           name='circle-with-plus'
           backgroundColor={G.primary} />

         <IconEntypo.Button
           style={styles.keyboardButton}
           name='controller-fast-forward'
           backgroundColor={G.primary}
           onPress={this.keyBoardPager.bind(this, 'next')}/>
        </View> : null}
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  valueNav: {
    padding: 10,
    backgroundColor: G.grey,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  keyboardButton: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 0,
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
    paddingLeft: 10,
    paddingRight: 10,
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
  weightArea: {
    flex: 1,
  },
  removeRow: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  inputStyle: {
    height: 35,
    flex: 1
  },
  single: {
    textAlign: 'center'
  },
  firstInput: {
    textAlign: 'right',
    flex: 1
  },
  full: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  times: {
    padding: 10,
  },
  labelsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 4
  },
  label: {
    color: '#222222',
    fontSize: 11,
  },
  weightLabel: {
    paddingLeft: 20,
    marginRight: -12
  },
  actions: {
    marginTop: 30,
    marginLeft: 75,
    marginRight: 75,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
  },
  addRowButton: {
  },
  actionText: {
    color: 'white'
  }
});
