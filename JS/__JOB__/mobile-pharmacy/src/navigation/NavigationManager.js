import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppNavigation } from './AppNavigation'
import { AuthScreen } from '../screens/AuthScreen'
import { autoLogin } from '../store/actions/user';


export const NavigationManager = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch])

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  return !isAuthenticated ? <AuthScreen /> : <AppNavigation />
}
