import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesome5 } from '@expo/vector-icons'

import { AppIconContainer } from '../../UI/AppIconContainer'
import { getAllTasks } from '../../../store/actions/task'


export const TaskIcon = ({ size, color }) => {
  const dispatch = useDispatch()
  const taskCount = useSelector(state => !state.task.accepted ? 0 : state.task.accepted.length)

  useEffect(() => {
    dispatch(getAllTasks())
  }, [])

  return (
    <AppIconContainer number={ taskCount }>
      <FontAwesome5 name='tasks' size={ size } color={ color }/>
    </AppIconContainer>
  )
}