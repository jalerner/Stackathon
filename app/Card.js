
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { stringify } from 'query-string';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class Card extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const photoItem = this.props.place.venue.photos.groups[0].items[0];
    return (
      <View>
        <Text>{this.props.place.venue.name}</Text>
        <Image 
          style={{width: 50, height: 50}}
          source={{uri: `${photoItem.prefix}${photoItem.width}x${photoItem.height}${photoItem.suffix}` }} />
      </View>
    );
  }


}
