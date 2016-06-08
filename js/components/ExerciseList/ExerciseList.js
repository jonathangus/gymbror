import { connect } from 'react-redux';
import styles from './styles';
import Swipeout from 'react-native-swipeout';
import NavigationBar from 'react-native-navbar';
import { deleteExercise } from '../../actions/exerciseActions';
import Icon from 'react-native-vector-icons/Entypo';
import G from '../../global';
import Back from '../Back/Back';
import React, { Component } from 'react';

import {
  View,
  Text,
  AlertIOS,
  ListView,
  TouchableHighlight
} from 'react-native';

let selectedExercise;

class ExerciseList extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true})

    this.state = {
      modalVisible: false,
      animatedModal: true,
      transparentModal: true,
      dataSource: ds.cloneWithRows([])
    }

    this.swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        autoClose: true,
        onPress:() => {
          AlertIOS.alert(
            'Remove exercise',
            'Do you really wanna remove this exercise?',
            [{text: 'Remove', onPress: () => {
                const { dispatch } = this.props;
                dispatch(deleteExercise(selectedExercise));
              }
            },
            {text: 'Cancel'},
            ]
          );
        }
      }
    ]
  }

  componentDidMount() {
    const {exercises} = this.props;

    if(exercises.exercisesFromUser.length > 0) {
      let dataSource = this.state.dataSource.cloneWithRows(exercises.exercisesFromUser)
      this.setState({
        dataSource: dataSource
      });
    }
  }

  _updateDataSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    })
  }

  _handleSwipeout(sectionID, rowID) {
    let rows = this.props.exercises.exercisesFromUser;
    for (var i = 0; i < rows.length; i++) {
      if (i != rowID) {
        rows[i].active = false
      }
      else {
        rows[i].active = true;
        selectedExercise = rows[i];
      }
    }
    this._updateDataSource(rows)
  }

  _goToExercise(exerciseData) {
    this.props.navigator.push({ExerciseInformation: 1, exercise: exerciseData});
  }

  componentWillReceiveProps(nextProps) {
    const { exercises } = nextProps;
    let dataSource = this.state.dataSource.cloneWithRows(exercises.exercisesFromUser)
    this.setState({
      dataSource: dataSource
    });
  }

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
      <Swipeout
        right={this.swipeoutBtns}
        rowID={rowID}
        close={!rowData.active}
        onOpen={(sectionID, rowID) => this._handleSwipeout(sectionID, rowID)}>
        <TouchableHighlight
          onPress={this._goToExercise.bind(this, rowData)}
          style={[G.basicRow, styles.row]}
          underlayColor={G.grey}>
          <Text style={styles.rowText}>{rowData.exerciseName}</Text>
        </TouchableHighlight>
      </Swipeout>
    )
  }

  render() {
    const rightButtonAdd = <TouchableHighlight
      underlayColor={G.grey}
      style={styles.addButton}
      onPress={() => this.props.navigator.push({newExercise: 1})}>
        <Icon
        name="plus"
        size={30}
        backgroundColor="#FFF"
        color={G.black}/>
    </TouchableHighlight>;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'Exercises' }}
          leftButton={<Back onPress={() => this.props.navigator.push({})}/>}
          rightButton={rightButtonAdd}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    exercises: state.exercises
  })
)(ExerciseList);