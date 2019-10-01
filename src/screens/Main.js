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

    this.state = {
      isModalVisible: false,
    };
  }

  cardAction = () => {};

  viewAction = (pokemon, image) => {
    this._pokemonStats = [];
    pokemonStats.forEach(item => {
      this._pokemonStats.push({
        label: item,
        value: getRandomInt(25, 150),
      });
    });

    this.setState({
      pokemon,
      image,
      stats: this._pokemonStats,
      isModalVisible: true,
    });
  };

  bookmarkAction = () => {};

  shareAction = (pokemon, image) => {
    this.props.navigation.navigate('Share');
  };

  closeModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  render() {
    const { isModalVisible, image, stats, pokemon } = this.state;
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

        <AnimatedModal
          title={'View Pokemon'}
          visible={isModalVisible}
          onClose={this.closeModal}
        >
          <BigCard title={pokemon} image={image} data={stats} />
        </AnimatedModal>
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