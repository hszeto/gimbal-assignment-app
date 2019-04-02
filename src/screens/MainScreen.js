import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import MainMap from '../components/MainMap';
import { getCafes } from '../services/fetchApi';

export default class MainScreen extends React.Component {
  state = {
    region: null,
    errorMessage: null,
    cafes: [],
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    this.setState({
      region
    }, () => this.fetchCafes() );

  }

  fetchCafes = async () => {
    const { latitude, longitude } = this.state.region;

    const cafes = await getCafes({
      lat: latitude,
      lon: longitude
    })

    this.setState({ cafes });
  }

  render() {
    return (
      <View>
        <MainMap
          region={this.state.region}
          places={this.state.cafes}
        />
      </View>
    );
  }
}
