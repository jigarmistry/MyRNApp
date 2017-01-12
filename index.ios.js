/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Drawer from 'react-native-drawer';

var MenuPage = require('./app/views/MenuPage');
var MainPage = require('./app/views/MainPage');
var PersonPage = require('./app/views/PersonPage');
var SearchPage = require('./app/views/SearchPage');

export default class MyApp extends Component {

  state={
    drawerOpen: false,
    drawerDisabled: false,
  };
  onMenuItemSelected = (item) => {
    this._drawer.close()
    alert(JSON.stringify(this._navigator.getCurrentRoutes()));
    this._navigator.push({
      id: 'PersonPage',
      name: 'Person',
    });
  }
  openDrawer = () => {
    this._drawer.open()
  };

  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="static"
        content={
          <MenuPage onItemSelected={this.onMenuItemSelected} />
        }
        acceptDoubleTap
        styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 10}}}
        onOpen={() => {
          console.log('onopen')
          this.setState({drawerOpen: true})
        }}
        onClose={() => {
          console.log('onclose')
          this.setState({drawerOpen: false})
        }}
        captureGestures={false}
        tweenDuration={100}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={(viewport) => {
          return 100
        }}
        closedDrawerOffset={() => 0}
        panOpenMask={0.2}
        negotiatePan
        >
      <Navigator
          ref={(ref) => this._navigator = ref}
          initialRoute={{id: 'MainPage', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
     </Drawer>
    );
  }
  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'MainPage') {
      return (
        <MainPage
            navigator={navigator} />
      );
    }
    if (routeId === 'PersonPage') {
      return (
        <PersonPage
          navigator={navigator} />
      );
    }
    if (routeId === 'SearchPage') {
      return (
        <SearchPage
          navigator={navigator} />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyApp', () => MyApp);