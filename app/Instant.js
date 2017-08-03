
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Card from './Card';
import { stringify } from 'query-string';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

const CLIENT_ID = '40a55d80f964a52020f31ee3';
const TOKEN = '2ONTTMJ3BVPLQWWICXYE04SMVFZWCC5D3YWIUHHEIZJOD4ZF';
const v = '20170803';
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';
const API_DEBOUNCE_TIME = 2000;

import {
  StackNavigator,
} from 'react-navigation';

export default class Instant extends React.Component {
  constructor() {
    super()
    this.state = {
      recommendations: [],
      headerLocation: null,
      last4sqCall: {}
    }
  }
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return (
      <View>
        {
          this.state.recommendations && this.state.recommendations.map(place => {
            console.log("key:", place.refferalId)
            console.log("place:", place)
            return (
              <Card place={place} key={place.referralId}/>
            )
            })
        }
      </View>
    );
  }

  componentWillMount() {
    let region = {
      latitude: '37.785834',
      longitude: '-122.406417'
    }
    this.fetchVenues(region, 'food')
  }

fetchVenues(region, lookingFor) {
        console.log("inside fetch venues")
        // if (!this.shouldFetchVenues(lookingFor)) return;
        const query = this.venuesQuery(region, lookingFor);
        console.log("query:", query)

        fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
            .then(fetch.throwErrors)
            .then(res => res.json())
            .then(json => {
                if (json.response.groups) {
                    this.setState({
                        recommendations: json.response.groups.reduce(
                            (all, g) => all.concat(g ? g.items : []), []
                        ),
                        headerLocation: json.response.headerLocation,
                        last4sqCall: new Date()
                    });
                }
            })
            .catch(err => console.log(err));
    }

venuesQuery({ latitude, longitude }, lookingFor) {
        console.log("inside venues query")

        return stringify({
            ll: `${latitude}, ${longitude}`,
            oauth_token: TOKEN,
            v: v,
            section: lookingFor || this.state.lookingFor || 'food',
            limit: 10,
            openNow: 1,
            venuePhotos: 1
        });
    }

}
