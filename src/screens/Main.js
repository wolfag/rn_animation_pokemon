/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import { View, Animated, Platform } from 'react-native';

import pokemonMock from 'pokemon_animation/src/data/pokemon';
import pokemonStats from 'pokemon_animation/src/data/pokemon-stats';

import BigCard from 'pokemon_animation/src/components/BigCard';
import AnimatedModal from 'pokemon_animation/src/components/AnimatedModal';
import CardList from 'pokemon_animation/src/components/CardList';
import AnimatedHeader from 'pokemon_animation/src/components/AnimatedHeader';

import { getRandomInt } from 'pokemon_animation/src/lib/random';
import { HEADER_MAX_HEIGHT } from 'pokemon_animation/src/settings/layout';

export default class Main extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#B4A608',
      },
      headerTitleStyle: {
        color: '#FFF',
      },
    };
  };

  constructor(props) {
    super(props);
    this._pokemonStats = [];

    this._nativeScrollY = new Animated.Value(
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
    );
  }

  cardAction = () => {};

  viewAction = (pokemon, image) => {
    this.props.navigation.navigate('Details',{
      title:pokemon,
      image:image,
      data:this._getPokemonStats(),
    });

  };

  _getPokemonStats=()=>{
    const pokemonStatsData = [];
    pokemonStats.forEach(item => {
      pokemonStatsData.push({
        label: item,
        value: getRandomInt(25, 150),
      });
    });
    return pokemonStatsData;
  }

  bookmarkAction = () => {};

  shareAction = (pokemon, image) => {
    this.props.navigation.navigate('Share');
  };


  render() {
    const nativeScrollY = Animated.add(
      this._nativeScrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0
    );

    return (
      <View style={styles.container}>
        <AnimatedHeader title={'Poke-Gallery'} nativeScrollY={nativeScrollY} />
        {this._nativeScrollY && (
          <CardList
            data={pokemonMock}
            cardAction={this.cardAction}
            viewAction={this.viewAction}
            bookmarkAction={this.bookmarkAction}
            shareAction={this.shareAction}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y: this._nativeScrollY },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          />
        )}
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};
