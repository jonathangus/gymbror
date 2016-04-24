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
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 30,
    borderBottomWidth: 0.5,
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
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