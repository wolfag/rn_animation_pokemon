import React from 'react';
import { View, Text, Animated, Platform, TouchableOpacity } from 'react-native';

import { HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE } from '../settings/layout';

const AnimatedHeader = ({ title, nativeScrollY, onPress }) => {
  if (nativeScrollY) {
    const headerTranslate = nativeScrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const BGImageOpacity = nativeScrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.3, 0],
      extrapolate: 'clamp',
    });

    const BGImageTranslate = nativeScrollY.interpolate({
      inputRange: [1, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = nativeScrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.8, 0.7],
      extrapolate: 'clamp',
    });

    const titleTranslateY = nativeScrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -10, -8],
      extrapolate: 'clamp',
    });

    const headerStyles = { transform: [{ translateY: headerTranslate }] };

    const headerBarStyles = {
      transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
    };

    const BGImageStyles = {
      opacity: BGImageOpacity,
      transform: [{ translateY: BGImageTranslate }],
    };

    return (
      <View style={styles.headerContainer}>
        <Animated.View
          pointerEvents="none"
          style={[styles.header, headerStyles]}
        >
          <Animated.Image
            style={[styles.headerBg, BGImageStyles]}
            resizeMode={'cover'}
            source={require('../img/team-instinct.jpg')}
          />
        </Animated.View>
        <Animated.View style={[styles.headerBar, headerBarStyles]}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.headerText}>{title}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
};

const styles = {
  headerContainer: {
    ...Platform.select({
      ios: {
        zIndex: 1,
      },
    }),
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#B4A608',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    zIndex: 1,
  },
  headerBar: {
    backgroundColor: 'transparent',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  headerText: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
};

export default AnimatedHeader;
