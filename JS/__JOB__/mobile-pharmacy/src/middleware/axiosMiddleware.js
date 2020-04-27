export const axiosMiddleware = store => next => action => {
  const result = next(action)

  console.log('getState', store)
  return result
}
