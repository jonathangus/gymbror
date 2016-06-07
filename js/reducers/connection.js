export default connection = (state = false, action) => {
  return action.type === 'SET_CONNECTION' ? action.isConnected : state;
}