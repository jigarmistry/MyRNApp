'use strict';

import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';;

import { EventEmitter } from 'fbemitter';

let _emitter = new EventEmitter();

class MainPage extends Component {

  static contextTypes = {
    drawer: PropTypes.object.isRequired,
  };
  componentDidMount() {
    var self = this;

    _emitter.addListener('openMenu', () => {
        self.context.drawer.open();
    });

    _emitter.addListener('back', () => {
        self.props.navigator.pop();
    });
  }

  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  renderScene(route, navigator) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <TouchableHighlight style={{backgroundColor: 'yellow', padding: 10}}
            onPress={this.gotoPersonPage.bind(this)}>
          <Text style={{backgroundColor: 'yellow', color: 'green'}}>Person</Text>
        </TouchableHighlight>
      </View>
    );
  }
  gotoPersonPage() {
    // this.context.drawer.open()
    this.props.navigator.push({
      id: 'PersonPage',
      name: 'Person',
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => _emitter.emit('back')}>
        <Text style={{color: 'white', margin: 10,}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => _emitter.emit('openMenu')}>
        <Text style={{color: 'white', margin: 10,}}>
          Menu
        </Text>
      </TouchableOpacity>
    );
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
         Home
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = MainPage;