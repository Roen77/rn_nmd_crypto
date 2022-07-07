import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Animated, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 5px;
  align-items: center;
`;
const CoinName = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

export const Icon = styled.Image`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;

const Coin = ({symbol, index, id}) => {
  //애니메이션
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: index * 120,
    }).start();
  }, [index, opacity]);
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });
  return (
    //스타일로 flex를 지정해주어야 제대로 너비차지하는듯?
    <TouchableOpacity style={{flex: 0.31}}>
      <Wrapper style={{opacity, transform: [{scale}]}}>
        <Icon
          source={{
            // uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
            uri: 'https://d2k6w3n3qf94c4.cloudfront.net/media/test/main_image/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2022-02-07_184525.png',
          }}
        />
        <CoinName>{symbol}</CoinName>
      </Wrapper>
    </TouchableOpacity>
  );
};
export default React.memo(Coin);
