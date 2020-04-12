import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { DATA } from '../data' // MOCK
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'

export const MainScreen = ({ navigation }) => {

  const openPostHandler = post => {
    navigation.navigate('Post', { // переход на страницу Post | название должно совпадать с ключами в createStackNavigator
      postId: post.id, // передаваемые данные
      date: post.date,
      booked: post.booked
    })
    // navigation.push('Post') // делает тоже самое что и navigate, но при указании текущей страницы - обновляет её
  }

  return <PostList data={DATA} onOpen={openPostHandler} />
}

MainScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Мой блог', // название страницы
  headerRight: ( // блок справа
    // В HeaderButtonComponent какой компонент используется для рендеринга иконки
    // Item - иконка
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Take photo'
        iconName='ios-camera' // название иконки
        onPress={() => navigation.push('Create')}
      />
    </HeaderButtons>
  ),
  headerLeft: ( // блок слева
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Toggle Drawer'
        iconName='ios-menu'
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )

  // navigation.toggleDrawer - переключает боковое меню с навигацией
})
