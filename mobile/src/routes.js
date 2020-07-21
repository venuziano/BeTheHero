import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();

import Logon from './pages/Logon'
import Incidents from './pages/Incidents'
import Detail from './pages/Detail'
import IncidentCreate from './pages/IncidentCreate'
import newOng from './pages/newOng'

export default function Routes() {
  return (
    <NavigationContainer>

      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Logon" component={Logon} />
        <AppStack.Screen name="newOng" component={newOng} />
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
        <AppStack.Screen name="IncidentCreate" component={IncidentCreate} />
      </AppStack.Navigator>

    </NavigationContainer>
  );
}