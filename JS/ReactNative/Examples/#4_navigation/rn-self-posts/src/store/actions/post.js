import * as FileSystem from 'expo-file-system'
import { LOAD_POSTS, TOGGLE_BOOKED, REMOVE_POST, ADD_POST } from '../types'

import { DB } from '../../db'

export const loadPosts = () => {
  return async dispatch => {
    const posts = await DB.getPosts()

    dispatch({
      type: LOAD_POSTS,
      payload: posts
    })
  }
}

export const toggleBooked = post => async dispatch => {
  await DB.updatePost(post)

  dispatch({
    type: TOGGLE_BOOKED,
    payload: post.id
  })
}

export const removePost = id => async dispatch => {
  await DB.removePost(id)
  dispatch({
    type: REMOVE_POST,
    payload: id
  })
}

export const addPost = post => async dispatch => {
  const fileName = post.img.split('/').pop()
  const newPath = FileSystem.documentDirectory + fileName

  try {
    await FileSystem.moveAsync({ // перемещение файла
      to: newPath,
      from: post.img
    })
  } catch (e) {
    console.log('Error:', e)
  }

  const payload = { ...post, img: newPath }
  payload.id = await DB.createPost(payload)

  dispatch({
    type: ADD_POST,
    payload
  })
}
