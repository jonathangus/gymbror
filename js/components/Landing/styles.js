import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null
  },
  actions: {
    flex:2
  },
  action: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  }
});