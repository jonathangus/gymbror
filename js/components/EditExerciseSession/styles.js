import { StyleSheet } from 'react-native';
import G from '../../global';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: G.grey
  },
  closeButton: {
    padding: 6
  },
  row: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 0.5,
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  },
});
