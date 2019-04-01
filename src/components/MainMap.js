import React from 'react';
import { MapView } from 'expo';
import { StyleSheet, Text, View } from 'react-native';

const Marker = MapView.Marker;

export default class MainMap extends React.Component {
  renderMarkers = () => this.props.places.map((place, i) => (
    <Marker
      key={i}
      title={place.name}
      coordinate={place.coords}
    />
  ))

  render() {
    const { region } = this.props;

    return (
      <View>
        <MapView
          ref={mapRef => mapRef===null ? null : mapRef.fitToElements(true) }
          style={styles.map}
          region={region}
          showsUserLocation
          showsMyLocationButton
        >
          { this.renderMarkers() }
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
