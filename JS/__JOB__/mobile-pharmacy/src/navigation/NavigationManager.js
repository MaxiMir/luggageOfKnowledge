import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppNavigation } from './AppNavigation'
import { AuthScreen } from '../screens/AuthScreen'
import { autoLogin } from '../store/actions/user';


export const NavigationManager = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  return !isAuthenticated ? <AuthScreen/> : <AppNavigation/>
}
