import React, { useEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux' // позволяет в функциональном компоненте изменять state c помощью actions | useSelector - предоставляет доступ до state

import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'
import { loadPosts } from '../store/actions/post';

export const MainScreen = ({ navigation }) => {

  const openPostHandler = post => {
    navigation.navigate('Post', { // переход на страницу Post | название должно совпадать с ключами в createStackNavigator
      postId: post.id, // передаваемые данные
      date: post.date,
      booked: post.booked
    })
    // navigation.push('Post') // делает тоже самое что и navigate, но при указании текущей страницы - обновляет её
  }

  const dispatch = useDispatch()

  useEffect(() => { // вызовется когда шаблон будет готов к работе
    dispatch(loadPosts())
  }, [dispatch]) // dispatch - не будет меняться, поэтому вызовется 1 раз

  const appPosts = useSelector(state => state.post.allPosts) // забераем по ключу post из rootReducer, а затем по ключу allPosts

  return <PostList data={appPosts} onOpen={openPostHandler} />
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
