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
    padding: 10,
    borderBottomWidth:1,
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  itemRow: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
  },
  chooseWrap: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: G.grey
  },
  picker: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  removeIcon: {
    flex:1,
    padding:2
  }

});
