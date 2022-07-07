import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BLACK_COLOR} from '../colors';
import Detail from '../screens/Detail';
import Home from '../screens/Home';

const Nav = createNativeStackNavigator();

function InNav() {
  return (
    <Nav.Navigator
      screenOptions={{
        presentation: 'modal',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: BLACK_COLOR,
        },
      }}>
      <Nav.Screen name="Home" component={Home} />
      <Nav.Screen name="Detail" component={Detail} />
    </Nav.Navigator>
  );
}

export default InNav;
