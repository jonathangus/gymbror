import { StyleSheet } from 'react-native';
import G from '../../global';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: G.grey
  },
  button: {
    padding: 15
  },
  closeButton: {
    padding: 6
  },
  addExercise: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addIcon: {
    marginRight: 7,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth:1,
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white'
  },
  rowItem: {
    flex: 1,
  },
  rowText: {
    flex: 1
  },
  section: {
    marginTop: 15
  },
  pickerTop: {
    padding: 10,
    backgroundColor: '#7f8c8d',
    alignItems: 'flex-end',
  },
  pickerTopText: {
    color: 'white',
  }

});
