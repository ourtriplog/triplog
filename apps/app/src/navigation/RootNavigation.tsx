import BootSplashGroup from '@screens/bootsplash.group';
import LoginGroup from '@screens/login.group';
import HomeGroup from '../screens/home.group';
import MapGroup from '../screens/map.group';
import { RootStack } from './RootStack';
import { useInitializeApp } from '@hooks/core';
import HistoryGroup from '@screens/history.group';

const RootNavigation = () => {
  const { isInitialized } = useInitializeApp();

  if (!isInitialized) return <></>;

  return (
    <RootStack.Navigator initialRouteName="BootSplashScreen">
      {BootSplashGroup()}
      {HomeGroup()}
      {LoginGroup()}
      {MapGroup()}
      {HistoryGroup()}
    </RootStack.Navigator>
  );
};

export default RootNavigation;
