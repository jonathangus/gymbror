import { MessageBarManager } from 'react-native-message-bar';

export const successMessage = (msg = 'Success') => {
  return MessageBarManager.showAlert({
    title: msg,
    alertType: 'success',
  });
}