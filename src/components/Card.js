import React from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import IconButton from './IconButton';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.scaleValue = new Animated.Value(0);
  }

  _onPressIn = () => {
    const { cardAction } = this.props;

    this.scaleValue.setValue(0);
    Animated.timing(this.scaleValue, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    cardAction && cardAction();
  };

  _onPressOut = () => {
    Animated.timing(this.scaleValue, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  _onPressSearchIcon = () => {
    const { viewAction, item } = this.props;
    viewAction(item.name, item.full_pic);
  };

  _onPressBookmarkIcon = () => {
    this.props.bookmarkAction();
  };

  _onPressShareIcon = () => {
    this.props.shareAction();
  };

  render() {
    const { item } = this.props;

    const cardScale = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1.2],
    });

    const transformStyle = {
      ...styles.card,
      transform: [{ scale: cardScale }],
    };
    return (
      <TouchableWithoutFeedback
        onPressOut={this._onPressOut}
        onPressIn={this._onPressIn}
      >
        <Animated.View style={transformStyle}>
          <Image source={item.pic} style={styles.thumbnail} />
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.icons}>
            <IconButton
              icon="search"
              data={item}
              onPress={this._onPressSearchIcon}
            />
            <IconButton
              icon="bookmark"
              data={item}
              onPress={this._onPressBookmarkIcon}
            />
            <IconButton
              icon="share"
              data={item}
              onPress={this._onPressShareIcon}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  card: {
    width: 120,
    height: 140,
    backgroundColor: '#fafbfc',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  thumbnail: {
    width: 75,
    height: 75,
  },
  icons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default Card;
