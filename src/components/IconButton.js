import React, { Component } from 'react';
import { TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class IconButton extends Component {
  constructor(props) {
    super(props);

    this.rotateValue = new Animated.Value(0);
  }

  static defaultProps = {
    iconSize: 15,
    iconColor: '#586069',
  };

  _onPressIn = () => {
    const { onPress, data } = this.props;

    Animated.timing(this.rotateValue, {
      toValue: 1,
      duration: 700,
      easing: Easing.linear,
    }).start();

    onPress && onPress(data);
  };

  _onPressOut = () => {
    Animated.timing(this.rotateValue, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
    }).start();
  };

  render() {
    const { icon, iconSize, iconColor } = this.props;

    const rotation = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const transformStyle = { transform: [{ rotate: rotation }] };

    return (
      <TouchableWithoutFeedback
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}
      >
        <Animated.View style={transformStyle}>
          <Icon
            name={icon}
            style={styles.icon}
            size={iconSize}
            color={iconColor}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  icon: {
    paddingLeft: 5,
    paddingRight: 5,
  },
};
