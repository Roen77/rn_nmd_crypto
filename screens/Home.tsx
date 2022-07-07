import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useQuery} from 'react-query';
import styled from 'styled-components/native';
import {coins} from '../api';
import {BLACK_COLOR} from '../colors';
import Coin from '../components/Coin';
const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
`;
const Loader = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  justify-content: center;
  align-items: center;
`;

const List = styled.FlatList`
  padding: 20px 10px;
  width: 100%;
`;

function Home() {
  const {isLoading, data} = useQuery('coins', coins);
  const [cleanData, setCleanData] = useState([]);

  useEffect(() => {
    if (data) {
      setCleanData(
        data.filter(coin => coin.rank != 0 && coin.is_active && !coin.is_new),
      );
    }
  }, [setCleanData, data]);
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color="white" size="large" />
      </Loader>
    );
  }
  return (
    <Container>
      <List
        data={cleanData}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        numColumns={3}
        //이렇게 아이템을 묶을수 있다. 3개의 열을 한줄에 저장함, 설정한 열의갯수만큼 View가 감싸고있음
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <Coin index={index} id={item.id} symbol={item.symbol} />
        )}
      />
    </Container>
  );
}

export default Home;
