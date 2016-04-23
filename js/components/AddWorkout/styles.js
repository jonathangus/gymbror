import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 15
  },
  closeButton: {
    padding: 6
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 0.5,
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
  },
  rowItem: {
    flex: 1,
  },
  rowText: {
    flex: 1
  }
});
