import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainScreen from './src/screens/MainScreen';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
