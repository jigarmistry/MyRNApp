'use strict';

import React, {
  Component, PropTypes
} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

class MenuPage extends Component {
  static propTypes = {
    onItemSelected: PropTypes.func.isRequired
  };

  render() {

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.controlText}>Control Panel</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.props.onItemSelected('Close')}>
          <Text>Close Drawer</Text>
        </TouchableOpacity>
        <Text style={styles.controlText}>Home</Text>
        <Text
          onPress={() => this.props.onItemSelected('About')}
          style={styles.item}>
          About
        </Text>
        <Text
          onPress={() => this.props.onItemSelected('Contacts')}
          style={styles.item}>
          Contacts
        </Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  }
})

module.exports = MenuPage;