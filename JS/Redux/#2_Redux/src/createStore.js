export function createStore(rootReducer, initialState) {
  let state = rootReducer(initialState, { type: '__INIT__'})
  const subscribes = []

  return {
    dispatch(action) { // action === {type: ACTION_TYPE}
      state = rootReducer(state, action)
      subscribes.forEach(sub => sub())
    },
    subscribe(callback) {
      subscribes.push(callback)
    },
    getState() {
      return state
    }
  }
}
