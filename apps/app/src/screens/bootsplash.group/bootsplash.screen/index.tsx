import { useNavigationService } from '@hooks/navigation';
import { ScreenType } from '@types';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

const BootSplashLottie = require('./asset/splash.json');

export type BootSplashScreenParams = {
  BootSplashScreen: undefined;
};

const BootSplashScreen = () => {
  const lottieRef = useRef<LottieView>(null);

  const { replace } = useNavigationService();

  useEffect(() => {
    RNBootSplash.hide({ fade: false });

    lottieRef.current?.play();
  }, []);

  const onAnimationFinish = () => {
    return replace('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={BootSplashLottie}
        style={styles.lottie}
        ref={lottieRef}
        loop={false}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0275FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 98,
    height: 113,
  },
});

export default {
  Screen: BootSplashScreen,
  name: 'BootSplashScreen',
} as ScreenType.ScreenType;
