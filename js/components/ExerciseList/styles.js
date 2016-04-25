import { StyleSheet } from 'react-native';
import G from '../../global';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: G.grey
  },
  addButton: {
    padding: 10
  },
  row: {
    padding: 20,
  },
  addItemsText: {
    marginTop: 100
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    padding: 10,
    color: 'white',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});