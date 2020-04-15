import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

import { MainScreen } from '../screens/MainScreen'
import { TasksScreen } from '../screens/TasksScreen'
import { TaskAddScreen } from '../screens/TaskAddScreen'
import { TaskCompleteScreen } from '../screens/TaskCompleteScreen'
import { PhotoScreen } from '../screens/PhotoScreen'
import { HistoryScreen } from '../screens/HistoryScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { HowToUseScreen } from '../screens/HowToUseScreen'
import { AddressDirectoryScreen } from '../screens/AddressDirectoryScreen'
import { THEME } from '../theme'

const isAndroidOS = Platform.OS === 'android'

const navigatorOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: isAndroidOS ? THEME.MAIN_COLOR : THEME.WHITE_COLOR
    },
    headerTintColor: isAndroidOS ? THEME.WHITE_COLOR : THEME.MAIN_COLOR
  }
}

const MainNavigator = createStackNavigator(
  {
    Main: MainScreen,
    HowToUse: HowToUseScreen,
    AddressDirectory: AddressDirectoryScreen,
  },
  navigatorOptions
)

const TasksNavigator = createStackNavigator(
  {
    Tasks: TasksScreen,
    TaskAdd: TaskAddScreen,
    TaskComplete: TaskCompleteScreen
  },
  navigatorOptions
)
const PhotoNavigator = createStackNavigator(
  {
    Photo: PhotoScreen,
  },
  navigatorOptions
)
const HistoryNavigator = createStackNavigator(
  { History: HistoryScreen },
  navigatorOptions
)
const ProfileNavigator = createStackNavigator(
  { Profile: ProfileScreen },
  navigatorOptions
)

const bottomTabsConfig = {
  Main: {
    screen: MainNavigator,
    navigationOptions: {
      tabBarLabel: 'Главная',
      tabBarIcon: info => <AntDesign name='home' size={25} color={info.tintColor} />
    }
  },
  Tasks: {
    screen: TasksNavigator,
    navigationOptions: {
      tabBarLabel: 'Задания',
      tabBarIcon: info => <FontAwesome5 name='tasks' size={25} color={info.tintColor} />
    }
  },
  Photo: {
    screen: PhotoNavigator,
    navigationOptions: {
      tabBarLabel: 'Скан',
      tabBarIcon: info => <MaterialIcons name='add-a-photo' size={ 25 } color={ info.tintColor }/>
    }
  },
  History: {
    screen: HistoryNavigator,
    navigationOptions: {
      tabBarLabel: 'История',
      tabBarIcon: info => <MaterialIcons name='history' size={25} color={info.tintColor} />
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'Профиль',
      tabBarIcon: info => <AntDesign name='user' size={25} color={info.tintColor} />
    }
  }
}

const BottomNavigator = isAndroidOS ?
  createMaterialBottomTabNavigator(bottomTabsConfig, {
      activeTintColor: THEME.WHITE_COLOR,
      shifting: true,
      barStyle: {
        backgroundColor: THEME.MAIN_COLOR
      }
    })
    :
    createBottomTabNavigator(bottomTabsConfig, {
      tabBarOptions: {
        activeTintColor: THEME.MAIN_COLOR
      }
    })

export const AppNavigation = createAppContainer(BottomNavigator)
