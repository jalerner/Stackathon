
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
// import { Screen, Spinner, Examples } from '@shoutem/ui';
import RecommendationsMap from './RecommendationsMap';
import MapView from 'react-native-maps';

// import { OverlayTopics, BottomTopics } from './Topics';

const CLIENT_ID = '40a55d80f964a52020f31ee3';
const CLIENT_SECRET = '2ONTTMJ3BVPLQWWICXYE04SMVFZWCC5D3YWIUHHEIZJOD4ZF&v=20170803';
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';
const API_DEBOUNCE_TIME = 2000;

import Home from './Home';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class Page extends React.Component {

  static navigationOptions = {
    title: 'Welcome',
  };

  state = {
    mapRegion: null,
    gpsAccuracy: null,
    recommendations: null,
    lookingFor: null,
    headerLocation: null,
    last4sqCall: null
  }
  watchId = null

  componentWillMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      }

      this.onRegionChange(region, position.coords.accuracy);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region, gpsAccuracy) {
    this.setState({
      mapRegion: region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
    });
  }

  render() {
    const { mapRegion, lookingFor } = this.state;
    console.log("map region:", mapRegion)
    return (
      <View>
        <Text>
          { mapRegion && mapRegion.latitude }, { mapRegion && mapRegion.longitude }
        </Text>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    )
  }

}



AppRegistry.registerComponent('Page', () => Page);
