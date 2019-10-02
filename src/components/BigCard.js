import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

import DataRow from './DataRow';

export default class BigCard extends Component {
  constructor(props) {
    super(props);

    this.imageOpacityValue = new Animated.Value(0);
    this.titleTranslateYValue = new Animated.Value(0);
    this.titleScaleValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.imageOpacityValue.setValue(0);
    this.titleTranslateYValue.setValue(0);
    this.titleScaleValue.setValue(0);

    Animated.sequence([
      Animated.timing(this.imageOpacityValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }),
      Animated.timing(this.titleTranslateYValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
      }),
      Animated.timing(this.titleScaleValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
      }),
    ]).start();
  }

  renderDataRows = data => {
    return data.map((item, index) => {
      return (
        <DataRow
          label={item.label}
          value={item.value}
          index={index}
          key={item.label}
        />
      );
    });
  };

  render() {
    const { image, title, data } = this.props;

    const imageOpacity = this.imageOpacityValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, 0.25, 0.5, 0.75, 1],
    });
    const imageOpacityStyle = {
      opacity: imageOpacity,
    };

    const titleMoveY = this.titleScaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 450],
    });
    const titleScale = this.titleScaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.25, 0.5, 1],
    });

    const titleTransformStyle = {
      transform: [{ translateY: titleMoveY }, { scale: titleScale }],
    };

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Animated.Image
            source={image}
            style={[styles.image, imageOpacityStyle]}
            resizeMode={'contain'}
          />
          <Animated.View style={[styles.titleContainer, titleTransformStyle]}>
            <Text style={styles.title}>{title}</Text>
          </Animated.View>
        </View>
        {data && (
          <View style={styles.dataContainer}>{this.renderDataRows(data)}</View>
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  titleContainer: {
    position: 'absolute',
    top: -200,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dataContainer: {
    flex: 2,
    flexDirection: 'column',
    padding: 20,
  },
};
