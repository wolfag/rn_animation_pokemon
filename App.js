/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import { View } from 'react-native';

import Route from './src/routes';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Route />
      </View>
    );
  }
}

const styles = {
  container: { flex: 1, backgroundColor: '#FFF' },
};
