import React from 'react';
import styled from 'styled-components/native';
import {BLACK_COLOR} from '../colors';
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
  return <Container />;
}

export default Home;
