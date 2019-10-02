import { Easing, Animated } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from 'pokemon_animation/src/screens/Main';
import ShareScreen from 'pokemon_animation/src/screens/Share';
import DetailsScreen from 'pokemon_animation/src/components/Details';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 400,
      easing: Easing.bounce,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
        extrapolate: 'clamp',
      });

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 0.2, 1],
        extrapolate: 'clamp',
      });

      return { opacity, transform: [{ translateX }] };
    },
  };
};

const MainStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    Share: {
      screen: ShareScreen,
    },
  },
  {
    initialRouteName: 'Main',
    transitionConfig,
  }
);

const RootStack = createStackNavigator({
  Main:{
    screen:MainStack,
  },
  Details:{
    screen: DetailsScreen,
  },
},{
  mode:'modal',
  headerMode:'none',
});

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
