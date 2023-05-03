import React from 'react'
import {createAppContainer, ThemeColors} from 'react-navigation' // для создания контейнера для всего нашего приложения
import {createStackNavigator} from 'react-navigation-stack' // для создания набора роутов
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer' // боковое меню с навигацией
import {Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {MainScreen} from '../screens/MainScreen'
import {PostScreen} from '../screens/PostScreen'
import {AboutScreen} from '../screens/AboutScreen'
import {CreateScreen} from '../screens/CreateScreen'
import {BookedScreen} from '../screens/BookedScreen'
import {THEME} from '../theme'


const isAndroidOS = Platform.OS === 'android'

const navigatorOptions = {
	// initialRouteName: 'Main' # указываем какой экран является главным
	defaultNavigationOptions: {
		headerStyle: { // стили для header
			backgroundColor: isAndroidOS ? THEME.MAIN_COLOR : '#fff'
		},
		headerTintColor: isAndroidOS ? '#fff' : THEME.MAIN_COLOR // цвет шрифта в header
	}

	/**
   Дефолтные стили можно переопределить в самом компоненте:
   > Заходим, например, в MainScreen.js
   > В MainScreen.navigationOptions прописываем стили в headerStyle, headerTintColor
	 */
}

const PostNavigator = createStackNavigator(
	{ // регистрация роута
		Main: MainScreen,
		Post: PostScreen
	},
	navigatorOptions
)

const BookedNavigator = createStackNavigator(
	{
		Booked: BookedScreen,
		Post: PostScreen
	},
	navigatorOptions
)


const bottomTabsConfig = { // конфиг для навигации внизу:
	Post: {
		screen: PostNavigator, // передаем навигатор
		navigationOptions: { // настройка навигатора
			tabBarLabel: 'Все', // текст под иконкой
			tabBarIcon: info => ( // иконка для скрина
				<Ionicons name='ios-albums' size={25} color={info.tintColor}/>
			)
		}
	},
	Booked: {
		screen: BookedNavigator,
		navigationOptions: {
			tabBarLabel: 'Избранное',
			tabBarIcon: info => (
				<Ionicons name='ios-star' size={25} color={info.tintColor}/>
			)
		}
	}
}

const BottomNavigator =
	isAndroidOS
		? createMaterialBottomTabNavigator(bottomTabsConfig, {
			activeTintColor: '#fff', // цвет активной иконки
			shifting: true, // эффект появление текста у активной иконки
			barStyle: {
				backgroundColor: THEME.MAIN_COLOR
			}
		})
		: createBottomTabNavigator(bottomTabsConfig, {
			tabBarOptions: {
				activeTintColor: THEME.MAIN_COLOR // цвет активной иконки
			}
		})

const AboutNavigator = createStackNavigator(
	{
		About: AboutScreen
	},
	navigatorOptions
)

const CreateNavigator = createStackNavigator(
	{
		Create: CreateScreen
	},
	navigatorOptions
)

const MainNavigator = createDrawerNavigator( // боковое меню с навигацией
	{
		PostTabs: {
			screen: BottomNavigator,
			navigationOptions: {
				drawerLabel: 'Главная' // название для боковой навигации
				// drawerIcon: <Ionicons name='ios-star' /> // иконка для боковой навигации
			}
		},
		About: {
			screen: AboutNavigator,
			navigationOptions: {
				drawerLabel: 'О приложении' // название для боковой навигации
			}
		},
		Create: {
			screen: CreateNavigator,
			navigationOptions: {
				drawerLabel: 'Новый пост' // название для боковой навигации
			}
		}
	},
	{
		contentOptions: { // опции для боковой навигации
			activeTintColor: THEME.MAIN_COLOR, // цвет шрифта
			labelStyle: {
				fontFamily: 'open-bold' // шрифт
			}
		}
	}
)

export const AppNavigation = createAppContainer(MainNavigator)

// используется в App.js
