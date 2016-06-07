import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import { connect, bindActionCreators } from 'react-redux';

class NetConnection extends Component {
  constructor() {
    super();

    NetInfo.isConnected.addEventListener('change', this._handleConnectionInfoChange.bind(this));
    NetInfo.isConnected.fetch().done((isConnected) => {
      this.props.dispatch({
        type: 'SET_CONNECTION',
        isConnected: isConnected
      });
    });
  }

  _handleConnectionInfoChange(isConnected) {
    this.props.dispatch({
      type: 'SET_CONNECTION',
      isConnected: isConnected
    });
  }
  
    render() {
    return null;
  }
}

export default connect(
  (state) => ({
    connection: state.connection
  })
)(NetConnection);