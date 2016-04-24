import G from '../../global';
import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 15
  },
  action: {
    backgroundColor: G.primary,
  },
  danger: {
    backgroundColor: G.danger
  },
  text_danger: {
    color: 'white',
  },
  text_action: {
    color: 'white'
  }

});

const underlay = {
  danger: '#c0392b',
  action: G.primary
};

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const type = this.props.type || 'action';
    return (
     <View>
       <TouchableHighlight
         underlayColor={underlay[type]}
         style={[styles.button, styles[type]]} onPress={this.props.onPress}>
         <Text style={styles['text_' + type]}>{this.props.children}</Text>
       </TouchableHighlight>
     </View>
    );
  }
}


