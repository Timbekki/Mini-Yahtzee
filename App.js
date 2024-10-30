import Home from './components/Home';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {SafearenaView, StatusBar} from 'react-native';
import { loadAsync } from 'expo-font';
import React, { useEffect } from 'react';

const Tab = createBottomTabNavigator();




export default App = () => {






  return (
 
  
    <NavigationContainer>
      <StatusBar barStyle="auto" />
      <Tab.Navigator
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'information'
                : 'information-outline';
            } else if (route.name === 'GameBoard') {
              iconName = focused 
              ? 'dice-multiple' 
              : 'dice-multiple-outline';
            }
            else if (route.name === 'ScoreBoard') {
              iconName = focused
              ? 'view-list'
              : 'view-list-outline';
            }
            return <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          },
          tabBarActiveTintColor: 'steelblue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
       
        <Tab.Screen name="Home" component={Home} 
        options={{tabBarStyle:  { display: "none" }}}/>
        <Tab.Screen name="GameBoard" component={GameBoard} />
        <Tab.Screen name="ScoreBoard" component={ScoreBoard} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}