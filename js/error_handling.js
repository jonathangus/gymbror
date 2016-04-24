import { MessageBarManager } from 'react-native-message-bar';

export function defaultError() {
  return MessageBarManager.showAlert({
    title: 'Something went wrong',
    alertType: 'error',
  });
}

export function errorMessage(message) {
  return MessageBarManager.showAlert({
    title: message,
    alertType: 'error',
  });
}

export function success(message) {
  return MessageBarManager.showAlert({
    title: message,
    alertType: 'success',
  });
}