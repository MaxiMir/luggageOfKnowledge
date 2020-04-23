import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

import { MainScreen } from '../screens/MainScreen'
import { TasksScreen } from '../screens/TasksScreen'
import { TaskScreen } from '../screens/TaskScreen'
import { TaskClosureScreen } from '../screens/TaskClosureScreen'
import { ScanScreen } from '../screens/ScanScreen'
import { HistoryScreen } from '../screens/HistoryScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { HowToUseScreen } from '../screens/HowToUseScreen'
import { AddressDirectoryScreen } from '../screens/AddressDirectoryScreen'
import { LogoutScreen } from '../screens/LogoutScreen'
import { TaskIcon } from '../components/Task/TaskIcon/TaskIcon'
import { SCREEN } from '../consts'
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
    [SCREEN.MAIN]: MainScreen,
    [SCREEN.HOW_TO_USE]: HowToUseScreen,
    [SCREEN.ADDRESS_DIRECTORY]: AddressDirectoryScreen,
  },
  navigatorOptions
)

const TasksNavigator = createStackNavigator(
  {
    [SCREEN.TASKS]: TasksScreen,
    [SCREEN.TASK]: TaskScreen,
    [SCREEN.TASK_CLOSURE]: TaskClosureScreen
  },
  navigatorOptions
)
const ScanNavigator = createStackNavigator(
  {
    [SCREEN.SCAN]: ScanScreen
  },
  navigatorOptions
)
const HistoryNavigator = createStackNavigator(
  {
    [SCREEN.HISTORY]: HistoryScreen
  },
  navigatorOptions
)
const ProfileNavigator = createStackNavigator(
  {
    [SCREEN.PROFILE]: ProfileScreen,
    [SCREEN.LOGOUT]: LogoutScreen
  },
  navigatorOptions
)

const bottomTabsConfig = {
  Main: {
    screen: MainNavigator,
    navigationOptions: {
      tabBarLabel: 'Главная',
      tabBarIcon: info => <AntDesign name='home' size={ 25 } color={ info.tintColor }/>
    }
  },
  Tasks: {
    screen: TasksNavigator,
    navigationOptions: {
      tabBarLabel: 'Задания',
      tabBarIcon: info => <TaskIcon color={ info.tintColor } size={ 25 }/>
    }
  },
  Photo: {
    screen: ScanNavigator,
    navigationOptions: {
      tabBarLabel: 'Скан',
      tabBarIcon: info => <MaterialIcons name='add-a-photo' size={ 25 } color={ info.tintColor }/>
    }
  },
  History: {
    screen: HistoryNavigator,
    navigationOptions: {
      tabBarLabel: 'История',
      tabBarIcon: info => <MaterialIcons name='history' size={ 25 } color={ info.tintColor }/>
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'Профиль',
      tabBarIcon: info => <AntDesign name='user' size={ 25 } color={ info.tintColor }/>
    }
  }
}

const BottomNavigator = isAndroidOS ?
  createMaterialBottomTabNavigator(bottomTabsConfig, {
    activeTintColor: THEME.WHITE_COLOR,
    shifting: true,
    barStyle: {
      backgroundColor: THEME.MAIN_COLOR,
      height: 75,
      justifyContent: 'center',
    }
  })
  :
  createBottomTabNavigator(bottomTabsConfig, {
    tabBarOptions: {
      activeTintColor: THEME.MAIN_COLOR,
      style: {
        paddingTop: 15,
        height: 70
      }
    }
  })

export const AppNavigation = createAppContainer(BottomNavigator)
