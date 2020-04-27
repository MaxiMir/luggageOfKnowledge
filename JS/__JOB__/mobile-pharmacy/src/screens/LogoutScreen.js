import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { logout } from '../store/actions/user';

export const LogoutScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
  }, [])

  return null
}
