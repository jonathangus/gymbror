import React from 'React';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import App from './components/App/App.js';

export default class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      store: configureStore(),
    };
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    );
  }
}