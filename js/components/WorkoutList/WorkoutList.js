import { connect } from 'react-redux';
import { fetchWorkoutsIfNeeded, refreshWorkouts} from '../../reducers/workouts';
import moment from 'moment';
import NavigationBar from 'react-native-navbar';
import _ from 'lodash'
import G from '../../global';
import Button from '../Button/Button';
import Back from '../Back/Back';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  RefreshControl
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: G.grey
  },
  groupTitle: {
    padding: 10,
  },

});

class WorkoutList extends Component {

  _onRefresh() {
    const { dispatch } = this.props;
    dispatch(refreshWorkouts());
  }

  goToWorkout(workout) {
    this.props.navigator.push({workoutInformation: 1, workoutData: workout});
  }

  sortWorkouts(items) {
    let groupedWorkouts = {};
    items.forEach((wo) => {
      const d = new Date(wo.date);
      const month = d.getMonth();
      const year = d.getYear();
      let groupItem = groupedWorkouts[year + month];

      if (!groupItem) {
        groupItem = {};
        groupItem.title = moment(wo.date).format('MMMM') + ' - ' + moment(wo.date).format('YYYY');
        groupItem.items = [];
        groupItem.timestamp = d.getTime();
      }
      groupItem.items = [...groupItem.items, wo];
      groupedWorkouts[year + month] = groupItem;
    });
    return _.sortBy(groupedWorkouts, 'timestamp').reverse();
  }

  render() {
    const { workouts } = this.props;
    const groupedWorkouts = this.sortWorkouts(workouts.items);
    var _scrollView: ScrollView;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'Completed workouts' }}
          leftButton={<Back  onPress={() => this.props.navigator.push({})} />
          }/>
        {groupedWorkouts.length == 0 ?
          <Button onPress={() => {this.props.navigator.push({addWorkout: 1})}}>You dont have any exercises, create one?</Button>: null}
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          scrollEventThrottle={200}
          refreshControl={
            <RefreshControl
              refreshing={workouts.isFetching}
              onRefresh={this._onRefresh.bind(this)}
            />}
          showsVerticalScrollIndicator={true}>
            {groupedWorkouts.map((group, key) => {
              return <View key={key}>
                <View style={styles.groupTitle}>
                  <Text>{group.title}</Text>
                </View>
                {group.items.map((workout, i) => {
                  return <TouchableHighlight
                    underlayColor={G.grey}
                    style={G.basicRow}
                    key={i}
                    onPress={this.goToWorkout.bind(this, workout)}>
                    <Text key={i}>{moment(workout.date).format('dddd, Do')}</Text>
                  </TouchableHighlight>
                })}
              </View>
            })}
          </ScrollView>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    workouts: state.workouts,
    user: state.user
  })
)(WorkoutList);