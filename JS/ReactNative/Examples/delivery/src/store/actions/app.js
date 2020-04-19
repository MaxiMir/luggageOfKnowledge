import { HIDE_LOADER, HIDE_LOADER_WITH_MESSAGE, SHOW_LOADER, SHOW_LOADER_WITH_MESSAGE } from '../types';


export const showLoader = () => ({
  type: SHOW_LOADER
})

export const hideLoader = () => ({
  type: HIDE_LOADER
})

export const showLoaderWithMessage = message => async dispatch => {
 setTimeout(() => {
   dispatch({
     type: SHOW_LOADER_WITH_MESSAGE,
     payload: message
   })
 }, 2500)
}

export const hideLoaderWithMessage = () => async dispatch => {
  setTimeout(() => {
    dispatch({
      type: HIDE_LOADER_WITH_MESSAGE,
    })
  }, 1500)
}
