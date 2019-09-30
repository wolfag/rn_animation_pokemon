import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from './Header';

const { height, width } = Dimensions.get('window');

export default class AnimatedModal extends Component {
  constructor(props) {
    super(props);

    this.yTranslate = new Animated.Value(0);
  }

  componentDidUpdate(prevProps, prevState) {
    const { visible } = this.props;
    if (visible) {
      this.yTranslate.setValue(0);
      Animated.spring(this.yTranslate, {
        toValue: 1,
        friction: 6,
      }).start();
    } else {
      Animated.timing(this.yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
      }).start();
    }
  }

  render() {
    const { title, children, onClose } = this.props;

    const negativeHeight = -height + 20;
    const modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight],
    });
    const translateStyle = {
      transform: [
        {
          translateY: modalMoveY,
        },
      ],
    };

    return (
      <Animated.View style={[styles.container, translateStyle]}>
        <Header title={title}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Header>
        <View style={styles.modalContent}>{children}</View>
      </Animated.View>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    height: height,
    width: width,
    bottom: -height,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 30,
  },
  closeText: {
    fontSize: 17,
    color: '#fff',
  },
};
