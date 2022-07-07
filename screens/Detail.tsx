import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components/native';
import {VictoryChart, VictoryLine, VictoryScatter} from 'victory-native';
import {history, info} from '../api';
import {BLACK_COLOR} from '../colors';
import {Icon} from '../components/Coin';
const Container = styled.ScrollView`
  background-color: ${BLACK_COLOR};
`;
const Detail = ({
  navigation,
  route: {
    params: {symbol, id},
  },
}) => {
  const [victoryData, setVictoryData] = useState(null);
  const {isLoading: infoLoading, data: infoData} = useQuery(
    ['coinInfo', id],
    info,
  );
  const {isLoading: historyLoading, data: historyData} = useQuery(
    ['coinHistory', id],
    history,
  );
  useEffect(() => {
    navigation.setOptions({
      title: symbol,
      headerTitle: () => (
        <Icon
          source={{
            // uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
            uri: 'https://d2k6w3n3qf94c4.cloudfront.net/media/test/main_image/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2022-02-07_184525.png',
          }}
        />
      ),
      ///참고로 headerTitle은 리엑트 컴포넌트를 반환하는 함수여야함
    });
  }, [navigation, symbol]);
  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map(price => ({
          //아래식은 시간을 밀리세컨드로 전환하는 법이다.
          x: new Date(price.timestamp).getTime(),
          y: price.price,
        })),
      );
    }
  }, [historyData]);
  return (
    <Container>
      {victoryData ? (
        <VictoryChart height={360}>
          <VictoryLine
            animate
            interpolation="monotoneX"
            data={victoryData}
            style={{data: {stroke: '#1abc9c'}}}
          />
          <VictoryScatter
            data={victoryData}
            style={{data: {fill: '#1abc9c'}}}
          />
        </VictoryChart>
      ) : null}
    </Container>
  );
};

export default Detail;
