import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import PlanTab from '../screens/tabs/PlanTab';
import BrowseTab from '../screens/tabs/BrowseTab';
import ProfileTab from '../screens/tabs/ProfileTab';

import ChallengeScreen from '../screens/ChallengeScreen';
import DayScreen from '../screens/DayScreen';
import StartScreen from '../screens/StartScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

import DetailModal from '../screens/modals/DetailModal';
import FilterModal from '../screens/modals/FilterModal';
import SignupModal from '../screens/modals/SignupModal';
import LoginModal from '../screens/modals/LoginModal';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />


      </Stack.Group>
      <Stack.Screen name="Challenge" component={ChallengeScreen} />
      <Stack.Screen name="Day" component={DayScreen} />
      
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen name="Filter" component={FilterModal} />
        <Stack.Screen name="Detail" component={DetailModal} />
        <Stack.Screen name="Login" component={LoginModal} />
        <Stack.Screen name="Signup" component={SignupModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}


const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Plan"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Plan"
        component={PlanTab}
        options={{
          title: 'Plan',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Browse"
        component={BrowseTab}
        options={({ navigation }: RootTabScreenProps<'Browse'>) => ({
          title: 'Challenges',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Filter')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="search"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="trash" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
