import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import { connect, bindActionCreators } from 'react-redux';
import { setConnection } from '../../actions/syncActions';

class NetConnection extends Component {
  constructor() {
    super();

    NetInfo.isConnected.addEventListener('change', this._handleConnectionInfoChange.bind(this));
    NetInfo.isConnected.fetch().done((isConnected) => {
      this.props.setConnection(isConnected);
    });
  }

  _handleConnectionInfoChange(isConnected) {
    this.props.setConnection(isConnected);
  }

    render() {
    return null;
  }
}

export default connect(
  (state) => ({
    connection: state.connection
  }),
  { setConnection }
)(NetConnection);
