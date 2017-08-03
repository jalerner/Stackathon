
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';

// import Recommendation from './Recommendation';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

const RecommendationsMap = ({ mapRegion, gpsAccuracy, recommendations, lookingFor, headerLocation, onRegionChange }) => (
  <MapView.Animated region={mapRegion} onRegionChange={onRegionChange}>
    <Text>
      CAN YOU STILL SEE ME???
      { lookingFor ? `${lookingFor} in` : ''} {headerLocation}
    </Text>
    <MapView.Circle
      center={mapRegion}
      radius={gpsAccuracy*1.5}
      strokeWidth={0.5}
      strokeColor="rga(66,180,230,1)"
      fillColor="rga(66,180,230,.2)"
    />
    <MapView.Circle
      center={mapRegion}
      radius={5}
      strokeWidth={0.5}
      strokeColor="rga(66,180,230,1)"
      fillColor="rga(66,180,230,1)"
    />
  </MapView.Animated>
)

export default RecommendationsMap

// AppRegistry.registerComponent('Page', () => Page);
