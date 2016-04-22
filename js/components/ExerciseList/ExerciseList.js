import React from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Swipeout from 'react-native-swipeout';

const {
  Component,
  View,
  Text,
  AlertIOS,
  ListView,
  TouchableHighlight
  } = React;


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
                const {dispatch} = this.props;
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

  //componentWillMount() {
  //  const {dispatch, user} = this.props;
  //  dispatch(fetchExercisesIfNeeded())
  //}

  componentDidMount() {
    const {exercises} = this.props;

    if(exercises.exercisesFromUser.length > 0) {
      let dataSource = this.state.dataSource.cloneWithRows(exercises.exercisesFromUser)
      this.setState({
        dataSource: dataSource
      });
    }
  }


  //_hideModal() {
  //  this.setState({
  //    modalVisible: false
  //  });
  //}

  //_showModal() {
  //  this.setState({
  //    modalVisible: true
  //  });
  //}

  //_addExercise() {
  //  var value = this.refs.form.getValue();
  //  if (value) {
  //    const {dispatch} = this.props;
  //    dispatch(addExercise(value));
  //    this.setState({
  //      modalVisible: false
  //    });
  //  }
  //}

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

  _addNewExercise() {
    this.props.navigator.push({newExercise: 1});
  }

  _goToExercise(exerciseData) {
  //  this.props.dispatch(selectExercise(exerciseData));
  //
  //  this.props.navigator.push({
  //    title: exerciseData.name,
  //    component: Exercise,
  //    passProps: {exerciseData},
  //  });
  }

  //componentWillReceiveProps(nextProps) {
  //  const exercises = nextProps.exercises;
  //  let dataSource = this.state.dataSource.cloneWithRows(exercises.exercisesFromUser)
  //  this.setState({
  //    dataSource: dataSource
  //  });
  //}

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
      <Swipeout
        right={this.swipeoutBtns}
        rowID={rowID}
        close={!rowData.active}
        onOpen={(sectionID, rowID) => this._handleSwipeout(sectionID, rowID)}>
        <TouchableHighlight
          onPress={this._goToExercise.bind(this, rowData)}
          style={styles.row}
          underlayColor="#F3F5F9">
          <Text style={styles.rowText}>{rowData.name}</Text>
        </TouchableHighlight>
      </Swipeout>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections />

        <TouchableHighlight onPress={this._addNewExercise.bind(this)}>
          <Text>Add new exercise</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    exercises: state.exercises
  })
)(ExerciseList);