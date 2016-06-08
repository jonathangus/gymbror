import { MessageBarManager } from 'react-native-message-bar';

export const successMessage = (title = 'Success', message = '') => {
  return MessageBarManager.showAlert({
    title: title,
    messsage: message,
    alertType: 'success',
  });
}

export const errorMessage = (title = 'Error', message = '') => {
  return MessageBarManager.showAlert({
    title: title,
    messsage: message,
    alertType: 'error',
  });
}
