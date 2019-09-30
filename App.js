/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import { View } from 'react-native';

import pokemonMock from './src/data/pokemon';
import pokemonStats from './src/data/pokemon-stats';

import BigCard from './src/components/BigCard';
import AnimatedModal from './src/components/AnimatedModal';
import CardList from './src/components/CardList';
import Header from './src/components/Header';

function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this._pokemonStats = [];

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

  shareAction = () => {};

  closeModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  render() {
    const { isModalVisible, image, stats, pokemon } = this.state;
    return (
      <View style={styles.container}>
        <Header title={'Poke-Gallery'} />
        <CardList
          data={pokemonMock}
          cardAction={this.cardAction}
          viewAction={this.viewAction}
          bookmarkAction={this.bookmarkAction}
          shareAction={this.shareAction}
        />
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
