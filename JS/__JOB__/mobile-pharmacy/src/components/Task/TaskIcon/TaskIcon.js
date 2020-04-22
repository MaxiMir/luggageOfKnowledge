import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesome5 } from '@expo/vector-icons'

import { AppIconContainer } from '../../UI/AppIconContainer'
import { getAllTasks } from '../../../store/actions/task'


export const TaskIcon = ({ size, color }) => {
  const dispatch = useDispatch()
  const taskCount = useSelector(state => !state.task.all ? 0 : state.task.all.length)

  useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])

  return (
    <AppIconContainer number={ taskCount }>
      <FontAwesome5 name='tasks' size={ size } color={ color }/>
    </AppIconContainer>
  )
}
