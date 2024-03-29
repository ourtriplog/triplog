import { getProfile, login } from '@react-native-seoul/kakao-login';

const useKakaoAuth = () => {
  const handleKakaoAuth = async () => {
    try {
      const token = await login();

      const profile = await getProfile();
    } catch (e) {
      console.error('Error on kakao');
    }
  };

  return {
    handleKakaoAuth,
  };
};

export default useKakaoAuth;
