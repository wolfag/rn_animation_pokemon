import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import IconLabel from '../components/IconLabel';

export default class Share extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Share',
      headerStyle: {
        backgroundColor: '#B4A608',
      },
      headerTitleStyle: {
        color: '#FFF',
      },
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <IconLabel
          icon="facebook-f"
          label="Share to Facebook"
          bgColor="#4267b2"
        />
        <IconLabel
          icon="google-plus"
          label="Share to Google+"
          bgColor="#db4437"
        />
        <IconLabel
          icon="linkedin"
          label="Share to LinkedIn"
          bgColor="#0077B5"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
